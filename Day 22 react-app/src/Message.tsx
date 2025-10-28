// PascalCasing

function Message({
    age
}:{
    age: number
}) {
    
if(age < 18 && age > 0){
   return <h2>You are not eligible to vote</h2>
}else if( age >= 18){
    return <h2>You are eligible to vote</h2>
}

}
export default Message;