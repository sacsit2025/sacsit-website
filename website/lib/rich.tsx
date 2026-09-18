import { Fragment, type ReactNode } from "react";

/**
 * The spec's own words, verbatim - the React twin of the page kit's `rich()`.
 *
 * Only this markup is understood: <b> <strong> <em> <i> <code> <sup> <sub>, <br>, and `backticks`
 * for mono. Everything else is text, character for character. The parser BUILDS React elements
 * instead of handing a string to dangerouslySetInnerHTML, so a sentence can never inject markup -
 * not even by accident, not even if a future editor pastes HTML into a spec.
 */

const TAGS = ["b", "strong", "em", "i", "code", "sup", "sub"] as const;
type Tag = (typeof TAGS)[number];

const OPEN = new RegExp(`<(${TAGS.join("|")})>`, "i");
const TOKEN = new RegExp(`<(?:/?)(?:${TAGS.join("|")})>|<br\\s*/?>|\`[^\`]+\``, "i");

interface Frame {
  tag: Tag | null;
  children: ReactNode[];
}

export function rich(source: string | undefined | null, keyPrefix = "r"): ReactNode {
  const text = source ?? "";
  if (!text) return null;
  if (!TOKEN.test(text)) return text;

  const stack: Frame[] = [{ tag: null, children: [] }];
  let rest = text;
  let n = 0;

  const push = (node: ReactNode) => stack[stack.length - 1]!.children.push(node);

  while (rest.length) {
    const m = TOKEN.exec(rest);
    if (!m || m.index === undefined) {
      push(rest);
      break;
    }
    if (m.index > 0) push(rest.slice(0, m.index));
    const token = m[0];
    const lower = token.toLowerCase();
    rest = rest.slice(m.index + token.length);

    if (lower.startsWith("<br")) {
      push(<br key={`${keyPrefix}-br-${n++}`} />);
      continue;
    }
    if (token.startsWith("`")) {
      push(
        <code key={`${keyPrefix}-c-${n++}`}>{token.slice(1, -1)}</code>,
      );
      continue;
    }
    if (lower.startsWith("</")) {
      const tag = lower.slice(2, -1) as Tag;
      // close the innermost frame with this tag; a stray close tag is printed as text
      const top = stack[stack.length - 1]!;
      if (stack.length > 1 && top.tag === tag) {
        stack.pop();
        push(
          <Tag key={`${keyPrefix}-t-${n++}`} tag={tag}>
            {top.children}
          </Tag>,
        );
      } else {
        push(token);
      }
      continue;
    }
    if (OPEN.test(token)) {
      stack.push({ tag: lower.slice(1, -1) as Tag, children: [] });
      continue;
    }
    push(token);
  }

  // an unclosed tag: print what it wrapped, in its element, rather than losing the words
  while (stack.length > 1) {
    const frame = stack.pop()!;
    stack[stack.length - 1]!.children.push(
      <Tag key={`${keyPrefix}-t-${n++}`} tag={frame.tag!}>
        {frame.children}
      </Tag>,
    );
  }

  const out = stack[0]!.children;
  return <Fragment key={keyPrefix}>{out}</Fragment>;
}

function Tag({ tag, children }: { tag: Tag; children: ReactNode }) {
  switch (tag) {
    case "b":
      return <b>{children}</b>;
    case "strong":
      return <strong>{children}</strong>;
    case "em":
      return <em>{children}</em>;
    case "i":
      return <i>{children}</i>;
    case "code":
      return <code>{children}</code>;
    case "sup":
      return <sup>{children}</sup>;
    case "sub":
      return <sub>{children}</sub>;
  }
}

/** The same words with every tag removed - for an alt, a title or a meta description. */
export function plain(source: string | undefined | null): string {
  return (source ?? "")
    .replace(new RegExp(`</?(?:${TAGS.join("|")})>`, "gi"), "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
