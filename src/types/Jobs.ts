export type Job = {
    id: number;
    title: string;
    description: string;
    address: string;
    zipcode: number;
    organization: string;
    city: string;
    workHome: string;
    region: {
        name: string;
    };
    workType: {
        type: string;
    };
    jobCategory: {
        name: string;
    };
};