interface PageVariable {
    name: string,
    type: string,
    initialValue: string
}

interface PageListItem {
    id: number,
    components: number[]
}

interface PageComponent<T extends ButtonOptions | ConditionOptions | ImageOptions | WeatherOptions> {
    id: number,
    type: 'button' | 'condition' | 'weather' | 'image',
    options: T,
    children?: number
}

interface PageData {
    variables?: PageVariable[],
    lists: PageListItem[],
    components: PageComponent[]
}
