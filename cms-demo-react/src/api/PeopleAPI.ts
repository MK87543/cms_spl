import type { Person } from "../utils/types";

export interface PeopleAPI {
    fetchPeople: () => Promise<Person[]>;
}
