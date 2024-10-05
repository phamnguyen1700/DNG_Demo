import './../Style/index.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
export default function FilterData() {
  return (
    <div className='flex space-x-4'>
        <input 
        className="placeholder:italic placeholder:text-slate-400 block bg-white h-12 w-1/3 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-800 focus:ring-1 sm:text-sm" 
        placeholder="Tìm kiếm học viên"
        type="text" 
        />
        <button className='h-12 w-36 text-white bg-violet-800 border rounded'>
            <SearchOutlinedIcon/>
            Tìm kiếm
        </button>
    </div>
  )
}
