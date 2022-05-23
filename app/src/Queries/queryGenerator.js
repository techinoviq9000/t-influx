

const middleString = (item) => {
  return  `${item.name}: insert_data_table_one(
    object: {
      value: $${item.name}
      field_id: $field_${item.id}
      applicant_id: $applicant_id
    },
    on_conflict: {constraint: data_table_field_id_applicant_id_key, update_columns: value, where: {field_id: {_eq:  $field_${item.id}}}}
  ) {
    id
  } `
  }
  export default generateQuery = (data) => {
    let startString = `mutation MyMutation(`
      let firstString = ""
      let closeFirstString = `) {`
      let endString = `}`
      let middlestring = ""
      data.map(item => {
        firstString+=`$${item.name}: String, $field_${item.id}: Int!
        `
        middlestring+=middleString(item)
      })
  
      let finalString = `${startString} ${firstString} $applicant_id: uuid! ${closeFirstString} ${middlestring} ${endString}`
      return finalString
  }

  let data =  [
    {
      id: 7,
      field_name: "Branch Name",
      name: "branchName",
      place_holder: "Select Branch Name",
      dropdown_values: [
        "Clifton",
        "Bahadrubad",
        "Tariq Road"
      ],
      order: 1,
      type: "Select",
      mandatory: true,
      icon: {
        color: "black",
        size: 23,
        name: "person"
      }
    },
    {
      id: 8,
      field_name: "Customer Type",
      name: "customerType",
      place_holder: "Select Type",
      dropdown_values: [
        "Individual (Single)",
        "Joint (Either/Survivor)",
        "Minor (Joint)"
      ],
      order: 2,
      type: "Select",
      mandatory: true,
      icon: {
        name: "person",
        size: 23,
        color: "black"
      }
    },
    {
      id: 9,
      field_name: "Purpose of Account",
      name: "purposeOfAccount",
      place_holder: "Select Purpose of Account",
      dropdown_values: [
        "Salary Transfer",
        "Savings",
        "Business",
        "Consumer Loans",
        "Investment",
        "Others"
      ],
      order: 3,
      type: "Select",
      mandatory: true,
      icon: {
        name: "person",
        size: 23,
        color: "black"
      }
    },
    {
      id: 10,
      field_name: "Account Type (1)",
      name: "accountType1",
      place_holder: "Select Account Type (1)",
      dropdown_values: [
        "PKR Current Account",
        "PKR Savings Account (Monthly)",
        "USD Current Account",
        "USD Savings Account (Monthly)",
        "AED Current Account",
        "AED Savings Account (Monthly)",
        "Euro Current Account",
        "Euro Savings Account (Monthly)",
        "SAR Current Account",
        "SAR Savings Account (Monthly)",
        "GBP Current Account",
        "GBP Savings Account (Monthly)"
      ],
      order: 4,
      type: "Select",
      mandatory: true,
      icon: {
        name: "person",
        size: 23,
        color: "black"
      }
    }
  ]