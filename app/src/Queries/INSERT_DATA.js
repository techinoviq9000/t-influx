import queryGenerator from "./queryGenerator"

export default INSERT_DATA_GQL = (data) => {
    return queryGenerator(data.length)
    // console.log(data.length);
}