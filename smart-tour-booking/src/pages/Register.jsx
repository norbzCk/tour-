function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <input type="text" placeholder="Full Name" className="w-full border rounded-lg p-2" />
        <input type="email" placeholder="Email" className="w-full border rounded-lg p-2" />
        <input type="password" placeholder="Password" className="w-full border rounded-lg p-2" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Register</button>
      </form>
    </div>
  );
}

export default Register;
