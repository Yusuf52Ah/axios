import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';    

export default function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      alert("Ro'yxatdan o'tish muvaffaqiyatli amalga oshirildi!");
      navigate("/login");
    }
  }
  return (
    <div className='flex flex-col gap-4'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Ro'yxatdan o'tish</h1>
        <p className='text-sm text-gray-500'>Yangi hisob yaratish</p>
      </div>
      {error &&
        <div className='p-3 text-sm bg-red-50 rounded-md text-red-500'>
          {error}
        </div>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          name="name"
          placeholder="Ism"
          value={formData.name}
          onChange={handleChange}
          className='border p-2 rounded-md'
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className='border p-2 rounded-md'
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Parol"
          value={formData.password}
          onChange={handleChange}
          className='border p-2 rounded-md'
          required
        />
        <button
          type="submit"
          className='bg-blue-500 text-white p-2 rounded-md disabled:opacity-50'
          disabled={loading}
        >
          {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
        </button>
      </form>
    </div>
  )
}
