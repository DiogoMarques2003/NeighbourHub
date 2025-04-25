const CheckBox = ({ description, checkBox, handleCheckbox, className }) => {
  return (
    <div class={`flex items-center mb-4 ${className}`}>
      <input id="default-checkbox" type="checkbox" checked={checkBox} onChange={() => handleCheckbox((prev) => !prev)}
             class="w-4 h-4 text-blue-600 bg-blue-100 border-blue-300 rounded-sm accent-[#3E94BF] cursor-pointer" />
      <label for="default-checkbox" class="ml-2 cursor-pointer">{description}</label>
    </div>
  );
};

export default CheckBox;