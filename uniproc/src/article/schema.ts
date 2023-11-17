export type Frontmatter = {
    title: string;
    date: Date;
    tags: string[];
};

export type ArticleComponent = Heading | DisplayComponent;
export type DisplayComponent = Paragraph | List | Code | Unclassified;
export type InlineComponent =
    | Text
    | Link
    | InlineCode
    | Emphasis
    | Strong
    | Unclassified;

export interface Heading extends IsParent {
    type: 'heading';
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    // TODO children: (Text | Link)[];
    children: (Text | Unclassified)[];
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
    // TODO children: (Paragraph | List)[];
    children: (ListItemPhrasing | List | Unclassified)[];
}

export interface ListItemPhrasing extends IsParent {
    type: 'listItemPhrasing';
    children: InlineComponent[];
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

export interface Unclassified extends IsNode {
    type: 'unclassified';
    typeValue: string;
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

export interface IsLeaf extends IsNode {
    // children: never | undefined;
}
