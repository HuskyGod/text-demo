export default function dateForm (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}