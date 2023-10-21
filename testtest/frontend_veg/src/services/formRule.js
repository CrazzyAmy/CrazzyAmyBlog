// form constraint 約束條件
const constraint = {
    email: {
      required: { 
        value: true,
        message: "此欄位必填寫"
      },
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: "不符合 Email 規則"
      },
    },
    name:{
      required: { 
        value: true,
        message: "此欄位必填寫"
      },
    },
    password:{
      required: { 
        value: true,
        message: "此欄位必填寫"
      },
      minLength:{
        value: 6,
        message: "密碼至少 6 位數"
      }  
    }
  }
  
  export default constraint;