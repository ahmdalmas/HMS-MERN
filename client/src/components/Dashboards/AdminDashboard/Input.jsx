import PropTypes from "prop-types";

Input.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    req: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};


function Input({ field }) {
  const name = field.name
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' '); const placeholder = field.placeholder;
  const required = field.req;
  const type = field.type;
  const value = field.value;
  const formattedName = () => {
    switch (name.toLowerCase()) {
      case 'cms id':
        return 'CMS ID';
      case 'dob':
        return 'Date Of Birth';
      case 'cnic':
        return 'CNIC';
      default:
        return name;
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-white">{formattedName()}</label>
      <input type={type} name={name} id={name} className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder={placeholder} required={required} value={value} onChange={field.onChange} />
    </div>
  );
}


export { Input };