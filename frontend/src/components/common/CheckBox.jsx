const CheckBox = ({description, handleCheckbox, className}) => {
    return(
        <div class={`flex items-center mb-4 ${className}`}>
            <input id="default-checkbox" type="checkbox" value={handleCheckbox} class="w-4 h-4 text-blue-600 bg-blue-100 border-blue-300 rounded-sm accent-[#3E94BF]"/>
            <label for="default-checkbox" class="ml-2">{description}</label>
        </div>
    )
}

export default CheckBox;