import logos from './projects_logos';

export interface IProject {
	title: string;
	role: string;
	logo: string;
	logo_height?: number | string;
	start_year: number;
	end_year?: number;
	description: string;
	skills: string[];
	media: IMedia[];
}

export interface IMedia {
	src: string;
	description: string; // not currently used
}

const projects: IProject[] = [
	{
		title: 'Brand New School',
		role: 'Development of new website',
		logo: logos.bns,
		logo_height: 'auto',
		start_year: 2023,
		// end_year: 2023,
		description:
			'For nearly two decades BrandNewSchool has been helping brands shape their visual voice through inspired design-driven solutions.',
		skills: ['react', 'nextjs', 'tailwind', 'gsap', 'statamic cms'],
		media: [
			{ src: 'bns-1.webm', description: '' },
			{ src: 'bns-1.png', description: '' },
			{ src: 'bns-3.png', description: '' },
			{ src: 'bns-2.png', description: '' },
		],
	},
	{
		title: 'SendOwl',
		role: 'Development & design of new website',
		logo: logos.sendowl,
		start_year: 2020,
		end_year: 2022,
		description:
			'SendOwl is an all-in-one solution designed to help creators successfully sell and deliver audiobooks, e-books, photography, software, memberships, event tickets, online courses, and much more.',
		skills: ['react', 'nextjs'],
		media: [
			{ src: 'sendowl-1.jpg', description: '' },
			{ src: 'sendowl-2.png', description: '' },
			{ src: 'sendowl-3.png', description: '' },
		],
	},
	{
		title: 'LivingArchive',
		role: 'Development and design of client CMS',
		logo: logos.livingarchive,
		start_year: 2020,
		end_year: 2022,
		description:
			'A collaborative environment to more easily store, manage, exhibit and showcase ALL of the content you and your stakeholders create.',
		skills: [
			'react',
			'nextjs',
			'express.js',
			'dynamodb',
			'aws',
			'redis',
			'elasticsearch',
			'figma',
		],
		media: [
			{ src: 'la-1.jpg', description: '' },
			{ src: 'la-2.jpg', description: '' },
			{ src: 'la-3.jpg', description: '' },
		],
	},
	{
		title: 'Parkbo',
		role: 'Development & design of website',
		logo: logos.parkbo,
		start_year: 2019,
		end_year: 2020,
		description:
			'Parkbo offers practical tools to understand and improve our financial choices, save and spend smarter, and ultimately live better.',
		skills: ['react', 'nextjs', 'figma'],
		media: [
			{ src: 'parkbo-1.png', description: '' },
			{ src: 'parkbo-2.png', description: '' },
		],
	},
	{
		title: 'Venture L',
		role: 'Development, design',
		logo: logos.venturel,
		start_year: 2020,
		description: '',
		skills: ['vue', 'figma'],
		media: [
			{ src: 'venturel-1.png', description: '' },
			{ src: 'venturel-2.png', description: '' },
			{ src: 'venturel-3.png', description: '' },
		],
	},
];

// export an array of all images so they can be preloaded
export const projectImages: string[] = projects
	.map((project: IProject) => project.media.map((image: IMedia) => image.src))
	.reduce((a, b) => [...a, ...b], []);

export default projects;
