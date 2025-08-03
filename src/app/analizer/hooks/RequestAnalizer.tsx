import { api } from "@/utils/api.utils";

interface Analizer {
    problems: any;
    image: string;
}

export async function fetchAnalizer(): Promise<Analizer> {
    const response = await api.get<Analizer>('/analizer')
    return response.data
}
