import { parse } from 'date-fns';

type Post = {
    title: string;
    postDate: Date;
    url?: string;
    description?: string;
};

type PostForm = {
    title: string;
    postDate: string;
    url?: string;
    description?: string;
};

const postForms: PostForm[] = [
    {
        title: 'Hugoでタグ別ページで次のタグ/前のタグのリンクを表示する',
        postDate: '2024-01-31',
        url: 'https://zenn.dev/ykyki/articles/hugo-next-prev-term-navigation',
    },
    {
        title: 'PlantUMLでクラス図を描くときのコツ',
        postDate: '2024-02-18',
        url: 'https://zenn.dev/ykyki/articles/tips-for-drawing-class-diagram-with-plantuml',
        description:
            '設計作業中にクラス図を描くときに意識していることをまとめた',
    },
];

const POSTS: Post[] = postForms.map((postForm) => {
    const post: Post = {
        title: postForm.title,
        postDate: parse(postForm.postDate, 'yyyy-MM-dd', new Date()),
        url: postForm.url,
        description: postForm.description,
    };
    return post;
});

export default POSTS;
