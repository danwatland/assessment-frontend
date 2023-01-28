interface Variable {
    name: string,
    type: string,
    initialValue: string
}

interface ListItem {
    id: number,
    components: number[]
}

interface ButtonOptions {
    text: string,
    variable: string,
    value: string
}

interface ConditionOptions {
    variable: string,
    value: string
}

interface WeatherOptions {
    lat: number,
    lon: number
}

interface ImageOptions {
    src: string,
    alt: string
}

interface PageComponent<T extends ButtonOptions | ConditionOptions | ImageOptions | WeatherOptions> {
    id: number,
    type: 'button' | 'condition' | 'weather' | 'image',
    options: T,
    children?: number
}

interface PageData {
    variables?: Variable[],
    lists: ListItem[],
    components: PageComponent[]
}
