import $host from './axios'

export const uploadImage = async (body: FormData) => {
    const { data } = await $host.post('image', body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return data
}
