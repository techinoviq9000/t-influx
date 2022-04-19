import * as yup from "yup";
export default dynamicRegisterValidationSchema = (data) => {
    const dataShape = {}
    data.map((value, index) => {
        dataShape[value.name] = yup.string().required(`Please select ${value.field_name}`)
    })
    return dataShape
};