export default function TextInput({ type = 'text', ...props }) {

    return (
        <div>
            <input
                {...props}
                type={type}
                className='w-full p-4 mb-3 border border-gray-400 rounded-md shadow-sm'
            />
        </div>

    );
};