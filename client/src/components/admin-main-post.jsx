import React from 'react';
import useHttp from '../hooks/http.hook';

const initialState = {
  visible: false,
  logo_color: '',
  contacts_bg: '',
  contacts_color: '',
  title_bg: '',
  title_color: '',
  title_content: '',
  title_contentType: '',
  date_date: '',
  date_time: '',
  videoplayer_visible: false,
  videoplayer_url: '',
  videoplayer_title: '',
};

const fieldsName = Object.keys(initialState);
fieldsName.splice(10, 1);
fieldsName.splice(0, 1);

const AdminMainPost = () => {
  const [form, setForm] = React.useState(initialState);
  const {request} = useHttp();

  const getMainPost = React.useCallback(async () => {
    try {
      const response = await request(`/api/mainpost`);
      setForm(response[0]);
    } catch (err) {}
  }, [request]);

  React.useEffect(()=>{    
    getMainPost();
    
  }, [getMainPost]);
  

  const handleChange = (e) => {
    const target = e.target;
    const name = e.target.name;
    setForm({ ...form, [name]: target.type === 'checkbox' ? target.checked : target.value });
  };

const handleSubmit = async () => {
  try {
    await request('/api/mainpost/5fe30fc14bcbc7188aa1bf37', 'PATCH', form)
  } catch(err){
    console.log(err)
  }
  
}

  return (
    <div className="admin-item">
      <h2>Main post</h2>
      <form className="admin-item__form" onSubmit={handleSubmit}>
        <div className="admin-item__field">
          <label>
            Visible
            <input type="checkbox" name="visible" checked={form.visible} onChange={handleChange}/>
          </label>
        </div>
        {fieldsName.map((fieldName) => (
          <div key={fieldName} className="admin-item__field">
            <label>
              {fieldName.toUpperCase()}
              <input
                type="text"
                name={fieldName}
                value={form[fieldName]}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        ))}

        <div className="admin-item__field">
          <label>
            VideoPlayerVisible
            <input
              type="checkbox"
              name="videoplayer_visible"
              checked={form.videoplayer_visible}
              onChange={handleChange}
              
            />
          </label>
        </div>
        <button>SEND CHANGES</button>
      </form>
    </div>
  );
};

export default AdminMainPost;
