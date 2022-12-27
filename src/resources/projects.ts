import logos from './projects_logos';

export interface IProject {
    title: string;
    role: string;
    logo: string;
    start_year: number;
    end_year?: number;
    description: string;
    skills: string[];
    images: IImage[];
}

export interface IImage {
    src: string;
    description: string; // not currently used
}

const projects: IProject[] = [
    {
        title: 'SendOwl',
        role: 'Frontend',
        logo: logos.sendowl,
        start_year: 2020,
        end_year: 2022,
        description:
            'SendOwl is an all-in-one solution designed to help creators successfully sell and deliver audiobooks, e-books, photography, software, memberships, event tickets, online courses, and much more.',
        skills: ['react', 'next.js'],
        images: [
            { src: 'sendowl-1.jpg', description: '' },
            { src: 'sendowl-2.jpg', description: '' },
            { src: 'sendowl-3.png', description: '' },
        ],
    },
    {
        title: 'LivingArchive',
        role: 'Frontend, backend, design',
        logo: logos.livingarchive,
        start_year: 2020,
        end_year: 2022,
        description:
            'A collaborative environment to more easily store, manage, exhibit and showcase ALL of the content you and your stakeholders create.',
        skills: ['react', 'next.js', 'express.js', 'dynamodb', 'aws', 'redis', 'elasticsearch'],
        images: [
            { src: 'la-1.jpg', description: '' },
            { src: 'la-2.jpg', description: '' },
            { src: 'la-3.jpg', description: '' },
        ],
    },
    {
        title: 'Parkbo',
        role: 'Frontend, design',
        logo: logos.parkbo,
        start_year: 2019,
        end_year: 2020,
        description:
            'Parkbo offers practical tools to understand and improve our financial choices, save and spend smarter, and ultimately live better.',
        skills: ['react', 'next.js'],
        images: [
            { src: 'parkbo-1.png', description: '' },
            { src: 'parkbo-2.png', description: '' },
            { src: 'parkbo-3.png', description: '' },
        ],
    },
    {
        title: 'Venture L',
        role: 'Frontend, design',
        logo: logos.venturel,
        start_year: 2020,
        description: '',
        skills: ['vue'],
        images: [
            { src: 'venturel-1.png', description: '' },
            { src: 'venturel-2.png', description: '' },
            { src: 'venturel-3.png', description: '' },
        ],
    },
];

// export an array of all images so they can be preloaded
export const projectImages: string[] = projects
    .map((project: IProject) => project.images.map((image: IImage) => `projects/${image.src}`))
    .reduce((a, b) => [...a, ...b], []);

export default projects;
