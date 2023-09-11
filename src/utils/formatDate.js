export const getFormattedDate = (data) => {
    return `${data.created_at.split("-")[2][0]}${data.created_at.split("-")[2][1]}/${data.created_at.split("-")[1]}/${data.created_at.split("-")[0]}`
}