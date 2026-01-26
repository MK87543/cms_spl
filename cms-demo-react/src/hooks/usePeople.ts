import { useEffect, useState } from "react";
import { RealAPI } from "../api/RealAPI";
import type { PeopleAPI } from "../api/PeopleAPI";
import type { Person } from "../utils/types";

export default function usePeople(api: PeopleAPI = new RealAPI()): Person[] {
    const [data, setData] = useState<Person[]>([]);

    useEffect(() => {
        api.fetchPeople().then((people) => setData(people ?? []));
    }, [api]);

    return data;
}
