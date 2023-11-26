export type DisplayComponent = Paragraph | List | Code | DisplayMath;
export type InlineComponent =
    | Text
    | Link
    | InlineCode
    | Emphasis
    | Strong
    | InlineMath;

export interface Root extends IsParent {
    type: 'root';
    children: (Heading | DisplayComponent)[];
}

export interface Heading extends IsParent {
    type: 'heading';
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    // TODO children: (Text | Link)[];
    children: Text[];
}

export interface Paragraph extends IsParent {
    type: 'paragraph';
    children: InlineComponent[];
}

export interface List extends IsParent {
    type: 'list';
    ordered: boolean;
    children: ListItem[];
}

export interface ListItem extends IsParent {
    type: 'listItem';
    children: (InlineComponent | List | Code)[];
}

export interface Code extends IsLeaf {
    type: 'code';
    lang?: string;
    value: string;
}

export interface Text extends IsLeaf, IsLiteral {
    type: 'text';
    value: string;
}

export interface Link extends IsLeaf {
    type: 'link';
    url: string;
    text?: string;
}

export interface InlineCode extends IsLeaf, IsLiteral {
    type: 'inlineCode';
    value: string;
}

export interface Emphasis extends IsLeaf, IsLiteral {
    type: 'emphasis';
    value: string;
}

export interface Strong extends IsLeaf, IsLiteral {
    type: 'strong';
    value: string;
}

export interface DisplayMath extends IsLeaf, IsLiteral {
    type: 'displayMath';
    value: string;
}

export interface InlineMath extends IsLeaf, IsLiteral {
    type: 'inlineMath';
    value: string;
}

export interface IsLiteral extends IsLeaf {
    value: string;
}

export interface IsNode {
    type: string;
}
export interface IsParent extends IsNode {
    children: IsNode[];
}

// TODO
// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface IsLeaf extends IsNode {
    // children: never | undefined;
}
