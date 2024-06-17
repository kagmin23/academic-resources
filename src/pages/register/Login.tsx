import { FacebookOutlined, GoogleOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const users = [
    {
      email: "admin",
      password: "123",
      roleId: 1, // SET ROlE
      role: "Admin",
    },
    {
      email: "user",
      password: "123",
      roleId: 2,
      role: "Student",
    },
    {
      email: "instructor",
      password: "123",
      roleId: 3,
      role: "Instructor",
    },
  ];

  const handleLogin = () => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      message.success(`Welcome, ${user.role}!`);
      localStorage.setItem('userData', JSON.stringify(user));
  
      switch (user.role) {
        case 'Guest':
          navigate('/guest');
          break;
        case 'Student':
          navigate('/student');
          break;
        case 'Instructor':
          navigate('/instructor');
          break;
        case 'Admin':
          navigate('/admin');
          break;
        default:
          navigate('/home');
      }
    } else {
      message.error('Invalid email or password');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAACnCAMAAABzYfrWAAAAilBMVEX///8AAADm5ubl5eXk5OTj4+P09PTx8fH4+Pju7u77+/vq6ur29vbs7OyhoaGkpKSurq7R0dGTk5PBwcFzc3O3t7fJycmVlZUVFRWEhITd3d1nZ2dPT088PDzT09N6enppaWksLCxAQEBaWlolJSUeHh40NDRISEhTU1OCgoIaGhp3d3cODg6Li4uiXLjHAAAR7UlEQVR4nO1da3vbKgwmtgN2sHNtkjVdu7Xd2u2c7f//vYOMjQ0WGN+StCd80tNakXiNhRASEAItCoKAAxGHQRAmQFGgKFAJUDFQXDwWKYYAiEVUMqTwGAOKKYZMMcDzISKLKVlpKStaNGXlDItQk0V1WRVDWFcuyHRZDJEVNGXhQJAbWje0pkYrlA9FOFpFD0JvtCKJVoiiVZPVCa0IR0vKqpRTaOWyrGhlOFouIIjqi/xVoORDQMmHgFKvL1AMsgeKIQVKKqQYYGwFSqFAMVSymJKVKlkLi6xYl0V7yWJdZdWBIJFoErO5oORPC2oufxooqYv451y+OUUBAy8ZIvnTwCB1gcek8hqD7IZiSIGB6rK4YgDloqasmnKpUg6RxW2ycuUMWXMfIKoXoYYtaoG0YYtZoGrYqm8q7PpNmdYu1GR5WCBPa9duijFZHwEtZYGuBK3QfCgKcHst0QpbTGJk9kBjMOeGqGmvq7khDIOwmhsw5czZrakcJitB5obIBwguWrYQLQYqASoFigHFgEqBSoCKgcqAAmKBMFCgqGJFGAxZBoMhi5es/ZSrZFmVS1zKNWTlsGImkeomUY4Si72W3y9Q8kVEzbnBYq8lw4C5oYO9rinXZW6oA0HKUXjzTj2AuKHVA60wLO21oORDgoqKhwRV2GtB5QxzQRUKCUp+icBQKCSowl6XDKGidFlMyUptshTDQimXKuUqWTpDqKhMl8WUrEzJElNJOLfJqgNBYmgJNCBSIBhQFCgKFAMq1R6zMjCdgTUZxpPVzhArhoqVDZEFL720oYIqTKIaJQLX0l6X8IfqRcBjXDFUL6Kw1+KxYm6oM1SyzFGiZFUMUX0w12QZo6SSFUQN5TBZCSJrrkakA4ibd3rz5adCK2za6zjSBrthrwPN1Ct73fgSNXtdDfZKFvIlVva6+urV14EqZ8gKNFnKXmNfoikr8gGCQUtFozpFgWI2CmFws6Yu1uuXVTxGjBeh2+vKJFpHiTKJKTYitbnBtNeKAZsbAoss+4jU5gbTXiMjMrPIcgAh0bp5pzdffiq0bPa6MomjfonhJF9iOOqXiAIhrTyFplNUp2yPWVknZTinrDoQXTwICb+vB+Eckcis3u5BGCNyKg/C6q3cvNObLz8hWmHTXusD8GOtqpvKjbaqhi9RD0+4gyJIAMYasbEFRTCGUSI2nrLaIzYOIIh6hyNGA5HVZa9oIGKv/-strong/-heart:>:o:-((:-hB0QDGx5Ej2igfOjmnd58+el8edMkUkHNzVW1xV4XO2TOuSEKI6u9hsE+7zQ3zJ32WshyR0FNX94Vca0DQTJo+aYjEHLTESi56QiU3OAESm5wuhgoUFSxxiVrscGpsWIMIIuk8e51tyD+snTlKllJqyzffhUMvXb2QzVsGzv70fCd/WT7z2w2+7JMptjZj5Rxaezshx5AXJV3KhQ5fJ+V7fuBJVfmnV4RWpwGxx+zevt5DBi/JrSuJtstprVhVbWHAyLrYtlu+Q8GkF+S/x+oIruR8yKBUPypSFYESmoFOSeKtchuLFkhIaVIVlQMXGNoyqLZ6hHBCtrbKqMVQyWLKlljKBcgyiU6EMUwv3SWbsw2dxaoZLvbILI6ZelGze+3d5buhb3T9ZsTK2iP66IvV+CdXg4tSua/W6GS7fcp5VeBlmYS52aS19w72800iXp2cmNuCBK2f/HECtrLniWmvUZkzbXMOvfE5ZobmkBMt1fdGmlmwg/tAJVs2zDlaHzrPHvVvfwt97D1qqrI4t3XzlhBe9/FWSd/C7F2H8s7FcP72Asq2Y5BF7Qu7su7p9v2HhxeB2AFDXzWAdVBlgzwLmiF5QRSQyuoz26hMbbC+tgKzEhVUB9bFUNG2PLLQKygfVlyxltkqbEVmLNbUB9bFYMBRNWvahyTtqnAPwPcY07cYMubfg18VkzWhHOiPmwn9bc4iVfPo2EF7XnFYIB9Qu80o5tvo0Il292G8fOj1XmdiMb1rOtElq27+KFd2suq6zoxMteJYdvEVaJV1biQtqIYoqpoiM6QELwAhxRVNISc/p0IKtn+PRGSaMpxUvbLrVzcZHAAYYtv2St2Ose3xLCyBWPGa4/rieJbOhCTe6fh/Z/JsYL25z66Uu/UEy3xu7v3s0Al2/sOAvkXyAAvH9JW1Wrhiu3RNzLAeXoasrzp17anNNCVw/IBEks+QCsQVcZEliSZzJNQFANKJlYApRIrMsUgszN0VkixWKSL3dDlTb/2uhMddiuH9ivTgDBYCwYi7RqyRYtlgHvuVc8DOl9eBCrZlnPKlZqD96onzgCHveYLYgUNBtjH8OUXqzFWzUPbz9XCexeya6TZP38Lq9hR+VsC1Cf37s05291TmgXd8reQXDEtfysviklUZYtGJaoApkbpDDVWRmNm3RS8THtbJjE1+oX0BukXDkR73ilWJ4DlnVJyur80Oki7PzHeO+90ogxwnrD1Of3QLu19zRKm+nV5X56wk++m4GXa79NIaPl+iVp9hL5Dtjjr8qZf+7VbtOyQqYnL9SXSwY1NEeQbv31jw7tKtFHSr4aMJSMHkMdvb0ueNM6D6FFDZtrrnt5pS5LMZdvdE8S8r8qXZ8sf7XpfoP1YsTNkgLetqhtzA2cXXx422+suRuy160t0rqrzehbpx5YUVZQsilFUqlMNhphkV/VB/jkmJKa6mtTWLx8ghuTYRM25IV7NZs+XBqlov+SwQqOBZ82xsUaa4+Vstu6R/-strong/-heart:>:o:-((:-haDR++3ui/Nrj8oDWUjy2m2rz0K+97PNUh0ni8h3PSGoGGqtqTkBrlYPqnSA5frvnBLXXLdVBYVt1UFHNWVS25JFoqGyRQWwoipExaahxgVi7LIoBSjEUVTQlA9itdf438dP7SyyIHtckBT0Xln6xsl9FJZLql42hDgRRFq5TNaduEpUNDQGtfap2VM4eGrw71ZVDz3YL8Wig9Ry5Cas5C7RKhoTxM8YHH1cyIvJhcmwMtMTckNGnaXMgyvZwSDMzb+0MGeADzjudS7TMLIN41V4+MKw9r+I08Mto6FodpJ13qvJLzGwZQZFGtowrIQUY5JxYy2ABrXjG8IqnsdrDgTLIlpHFPphyeb9ktozqF5I2hGbm1IDoUc1ZH7ZmslPlQRTj/CkqU97oRKvuf5bJgkvlwk2VMKaU65Cle+5qztI7VTk2a7EASbJCoQlW3a+HQlYGidLL5EPl2IDdWhENLVjcnmTUMaCn7ZjpSV/+nqQsTudH2PJdTY3WWNWcMgGY34sVWi6zmBvWtSEgGIKMHX6NhNWvfZJJz2mxe5B/WiWe2W6WTGivas4hHgRM18Wbo4didfgunAiJcaaSR74spYtHOD39HQGr38WwCmhUZRJs5fvUlLN7EEFQKwHo5W+5s3Sd/harTXsP3EQL/vhUsCbpfpjP+rJmTNajks1D7e9HAy3bN+Xhb+FZukPHlvpVoq0KnxdNtGazn2s5CYseRP13ir6FoEmu3PpZ+485ti7ky3uMLaP333O0kkYa17+bmBd7tkZX/dobFMGCveZk3gD8TGNr2KoaFJqbmj8hYytvjysmi/T5onMZy/e8wJqkQcKw8uKtUq7zGUl+q+qR5sSk0e+vtDYnGu3+ifFivbR89obqDcoIQDkec3yiMOZEtTabjzUnjuRv0abqSelvYe3rmuUvOOXx4cHyjN4eDrn4GIaVrQ50cn9rHLT4pqn6gTvQmhUhTiGL02z5swWqn8eIyYManHlPF0Gr+zqR75qq73jkRAt2ZfKfA6vgHGAPB7HYlBbIXQe6SgatExtoNYDQDwGRv8rrB3Nwn4M5MgStQxbEbrTEmNnO00SeGhIe8XTVL1AXDLKyODm2jMElK5Uj2KkhvOsJJQgQZIz4VtJUXTjbHJsTjSYWRYtQ2lBk1f0Kw0rK8phAt0o5t72++H0+zYFBLB5Eo/0jVt1c+kAnrSjoz9+5lMVT5pXGcyXeaTtajSKVrTdaszyeJ+M8SbIvJ7yve2nWw8w7lngmtEbY8zE1J13Qyot+ZQ84m8Osdy/GWyHLPztsqys3/p6P5wmArYfsEcOH2MEvJ2zl21HRvj8RmuRbkXQfy01B8W12WU8eie8JgP5HBtaBGG+vOt5rYMUy36dlTjTa8x7eNY+CYlh1rQNdJa6KnRH2qkeMnYaqa2+neuy0U/t2IqWLGXRODvggvrxUKCi1PpHeaMHevHDBEtLp9KRzoTVW/hYopDKR/qq5oQdaot0f+iU1rRJXxU6v/-strong/-heart:>:o:-((:-hak4diDFO8y4ookbDF1IwLLpY+eFtmfqe5t3v5HCi7NrQvFOxuqzUPjXi8mdpRzVK3CfF9847xS1QnzwIXpsU11hcfvr2YXx5kia1KexbZkHr5/vf7XrzdJrzJHraPG32x/vHtnBNwfl4f9xvBGuQ8NPTZrPebt9NTiTSfF33+VTVnEltTfxOEbRejk9ZvuqXPcj3r3IJwWHrngBfthtQSnDKA57gXvd89GabY53TjDQ773prreZEvkRZqjPG5TdxfUFc/G6srPz3HSWLOMVvyxHYptbMuLsNIzFwIqyQdV5bRR7j1t4MugWoXzUndsoi01aKjNV9+bd1rI9I5GYPyvi+GUH+ug9QWdooiflebmnYPAifUxa9ashG806ptlA8sMo7fdnVjqa2xjMFA4+f9FTV90PMfc4AF0vxvOrv4/jyqbZOXFKF1ppx3xPThYRDlbf040B54HtiOif7s/ryA+uqY21V928qv8TV2yJB5gbX/Wtl0OGOoPf5IF9i4REuHpfYl9jhPp/WL7HzRZY2hoUWsXvNf5jRDaNdL80kch5dLrresknZIW69ZXPQjZ5EfxEDPAg9D+IPUd+vGpH43FDKqu7zyeE6pn73+dTtdVDFAHve53Omak5iBk8lWorBZu3Mcz+l8fo1+0r9LNBHPQN8TLROs3l2vWiNcUZSrKOVP+e+JXeOfImFrFffu94we926qu5/RlKXiE2sRTaMGMdJR+vA8DvRPO5fE39YpU5Z4931hjDEOoMWsXFHA1XUrPVsN3Nvf8e9q4OQ+9d4NTcg9tqsvsfu5kR2b4ac7TayL8/3Olp7HnzC2yanQms9FlqVrCtAKyozGgaed8qNCPySt2VPGBlolSz9LOyoKaum3OT3+ehAqLN05RVnrrN0F6ooRlbRKIZ899UYW/lGqDquNmfguqwUkZV4yTKVSxXrQpMVI7IMBqes5lm65SgcfE6zsV9xn7/0mi8f2O/zAVnuu97M7zfS1uK2ip0B5zQvUCAUWoO90yOGVk/vtCHrqrzTMdAydgC/fV60xqjmNCpc73SGCJ8bZAbagLve+t3n0zvbLVBvDiipC1Dyp4FKy1ESqBcRqPFSJCuK3zjsoa1Fy4kDvGv10gP10jFZVMmKLbIWmixTuUQxcE05rhhkv22ydAYXEL38LayaU27G5PNMydrpHhTsDH/N37Lfv2b5poZn6U7mnXa6z+fDeqc3tC5RzTn4bk7bvTaIL9/TXo90N+fAO+7m1QkHxk93nxPnLRj7Vuy458RqAFzvfT6fxd+6oTX1fT4j3vvaipbdF7jEva+672e4coly5RDfz+rKGX6mYsX8TFr4fi2yYl2W06flNlkDfNokuM2Jl6jmnM7f+pSR5v8NWh1P/QlbTKI7rmfODUhcT4shhs51oinLGderZPU+9aeqceFZVoZlBVWEZQVVhGUFpYpiirBsk4ECRRVrEcetMxiyDAZDFi9lYcrRVuUqWZhyFWvJ0ApEDutop5XZ9z6c+xE06j039NuPuHg15//LO72h5Y9W12pOy30+aD6A7IGlOgjL3zJyxZx79MyyR++RD4Dlb7VVc46bk8F0BluuiUcBTuf8D0RW59KlNllo3qm7mtOSd1q9CC23yJ7HhGT5YblF1jymRt4packt6n6fz5TVnOR/4Z3e0PJGa0A1py23V30d7txeV75t7av3qNjB8rc612JY8rd0IGSmM6VlznNJUaCYjUIYWlipg7WVgXaS1ZnBqVydlRgvwp13aqkTMD0IS02CtU4AmxsCiyz7iHTmnWIZ4BZZrrxT+fs37/Tmy1+qmnPcL9FRizHgSwxH/RLxWgxl5kYvfZyQ4Zyy6kB08SAk/J/eg7BWB92808/my19V1gi2qtYG4G1VXVPu00RsuijXV9Z/K3yf22vMuysAAAAASUVORK5CYII=" alt="Academic-Resources" className="h-12" />
        </div>
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-center text-gray-600">Login To Your Academic Account!</p>
        <div className="flex flex-col space-y-2">
          <Button icon={<FacebookOutlined />} type="primary" className="flex items-center justify-center w-full h-12">
            Continue with Facebook
          </Button>
          <Button icon={<TwitterOutlined />} type="primary" className="flex items-center justify-center w-full h-12">
          Continue with Twitter
          </Button>
          <Button icon={<GoogleOutlined />} type="primary" className="flex items-center justify-center w-full h-12">
          Continue with Google
          </Button>
        </div>
        <div className="space-y-4">
          <Input placeholder="Email Address" size="large" value={email} onChange={e => setEmail(e.target.value)} />
          <Input.Password placeholder="Password" size="large" value={password} onChange={e => setPassword(e.target.value)} />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-600">Remember Me</span>
            </label>
            <a href="/forgot-password" className="text-blue-600">Forgot Password?</a>
          </div>
          <Button type="primary" className="w-full h-12 bg-red-500 hover:bg-red-600" onClick={handleLogin}>Login </Button>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-gray-600">Don't have an account? <Link to="/sign-up" className="text-blue-600">Sign Up</Link></p>
        </div>
        <footer className="text-center text-gray-600">
          <p>© 2024 Academic. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;