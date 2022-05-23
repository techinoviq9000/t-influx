import queryGenerator from "./queryGenerator"

export default INSERT_DATA_GQL = (data) => {
    return queryGenerator(data)
    // console.log(data.length);
}