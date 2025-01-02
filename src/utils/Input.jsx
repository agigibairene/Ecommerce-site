/* eslint-disable react/prop-types */

export default function Input({name, value, type, placeholder, onChange}){
    return(
        <>
            <input 
                className="px-2 py-3 my-2 border w-full outline-0 rounded-sm"
                type={type} 
                name={name} 
                value={value} 
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    )
}