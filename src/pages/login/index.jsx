import React from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { Button } from '@/components/ui/button';

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      alert("Kirish muvaffaqiyatli amalga oshirildi!");
      navigate("/");
    }
  }

  return (
    <div className='flex flex-col gap-4'>

      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Kirish</h1>
        <p className='text-sm text-gray-500'>Hisobingizga kirish</p>
      </div>
      {error &&
        <div className='p-3 text-sm bg-red-50 rounded-md text-red-500'>
          {error}
        </div>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          {loading ? "Yuklanmoqda..." : "Kirish"}
        </button>
        <Button onClick={() => navigate("/register")}>Ro'yxatdan o'tish</Button>
      </form>
    </div>
  )
}