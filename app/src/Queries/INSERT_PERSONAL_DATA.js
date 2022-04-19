import queryGeneratePersonalData from "./queryGeneratePersonalData"

export default INSERT_PERSONAL_DATA = (data) => {
    return queryGeneratePersonalData(data.length)
    // console.log(data.length);
}