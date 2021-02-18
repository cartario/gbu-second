import React from 'react';
import useHttp from '../hooks/http.hook';

const initialState = {
  visible: false,
  videoplayer_visible: false,
  background: '',
  title_content: '',
  title_contentType: '',
  address: '',
  date_date: '',
  date_time: '',
  // contacts_bg: '',
  contacts_background_1: '',
  contacts_background_2: '',
  // logo_color: '',
  contacts_color: '',
  // title_bg: '',
  // title_color: '',
  videoplayer_url: '',
  videoplayer_title: '',
};

const fieldsName = Object.keys(initialState);
fieldsName.splice(0, 1);
fieldsName.splice(0, 1);

const AdminMainPost = () => {
  const [showSection, setShowSection] = React.useState(false);
  const [form, setForm] = React.useState(initialState);
  const { request } = useHttp();

  const handleClickShowSection = () => {
    setShowSection(!showSection);
  };

  const getMainPost = React.useCallback(async () => {
    try {
      const response = await request(`/api/mainpost`);
      setForm(response[0]);
    } catch (err) {}
  }, [request]);

  React.useEffect(() => {
    getMainPost();
  }, [getMainPost]);

  const handleChange = (e) => {
    const target = e.target;
    const name = e.target.name;
    setForm({ ...form, [name]: target.type === 'checkbox' ? target.checked : target.value });
  };

  const handleSubmit = async () => {
    form.videoplayer_url = 'https://www.youtube.com/embed/' + form.videoplayer_url.split('/').pop();
    try {
      await request('/api/mainpost/5fe30fc14bcbc7188aa1bf37', 'PATCH', form);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-section" style={{ backgroundColor: '#80cbc4' }}>
      <h2 style={{ color: '#004d40' }} onClick={handleClickShowSection}>
        Main post {showSection ? '(свернуть)' : '(развернуть)'}
      </h2>
      {showSection &&
      <div className="admin-item">
      <form className="admin-item__form" onSubmit={handleSubmit}>
        <div className="admin-item__field">
          <label>
            Visible
            <input
              type="checkbox"
              name="visible"
              checked={form.visible}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            CONTACTS_BACKGROUND_1
            <input
              type="color"
              name="contacts_background_1"
              value={form.contacts_background_1}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            CONTACTS_BACKGROUND_2
            <input
              type="color"
              name="contacts_background_2"
              value={form.contacts_background_2}
              onChange={handleChange}
            />
          </label>
        </div>

        {fieldsName.map((fieldName) => {
          if (fieldName !== 'contacts_background_1' && fieldName !== 'contacts_background_2') {
            return (
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
            );
          }
        })}

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
  
      }
    </div>
  );
};

export default AdminMainPost;
