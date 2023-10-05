export async function api<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init)
    if (!response.ok) {
        const error = (await response.json()) as { msg: T }
        throw new Error(error.msg as string)
    }
    const data = (await response.json()) as { data: T }
    // TODO use data.meta?
    return data.data
}
