import React, { useEffect, useState } from "react";
import './App.css';
import { supabase } from "./supabaseClient";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      // Fetch only mapped columns: message, footer
      const { data, error } = await supabase
        .from('message')
        .select('message,footer');
      if (error) {
        setError(error.message);
        setData(null);
      } else {
        setData(data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Helper to get footer text
  const getFooterText = () => {
    if (loading) return '';
    if (error) return '';
    if (data && data.length === 1) {
      return data[0].footer || <span className="text-muted">&copy; {new Date().getFullYear()} Hello World React App</span>;
    }
    if (data && data.length > 1) {
      // If multiple rows, show first non-empty footer
      const firstFooter = data.find(row => row.footer);
      return firstFooter ? firstFooter.footer : <span className="text-muted">&copy; {new Date().getFullYear()} Hello World React App</span>;
    }
    return <span className="text-muted">&copy; {new Date().getFullYear()} Hello World React App</span>;
  };

  return (
    <>
      <div className="container main-content">
        <div className="flex-grow-1 w-100 d-flex justify-content-center align-items-center">
          <div className="text-center animate__animated animate__fadeIn w-100">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 150 }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">{error}</div>
            ) : data && data.length === 1 ? (
              <h1 className="display-3 fw-bold mb-3">{data[0].message || <span className="text-muted">No message</span>}</h1>
            ) : data && data.length > 1 ? (
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Message</th>
                      <th scope="col">Footer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.message ?? <span className="text-muted">N/A</span>}</td>
                        <td>{row.footer ?? <span className="text-muted">N/A</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h1 className="display-3 fw-bold mb-3 text-muted">No message</h1>
            )}
          </div>
        </div>
      </div>
      <footer className="footer mt-auto py-3 w-100 bg-light border-top animate__animated animate__fadeInUp">
        <div className="container text-center">
          <span className="text-muted">{getFooterText()}</span>
        </div>
      </footer>
    </>
  );
}

export default App;
