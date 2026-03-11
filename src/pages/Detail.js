import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useIncidents } from '../context/IncidentsContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { incidents, fetchIncidents, fetchIncidentById, loading, error, clearError } = useIncidents();
    
    const [incidentData, setIncidentData] = useState(null);
    const [loadError, setLoadError] = useState(null);

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'критический': return '#ff4444';
            case 'высокий': return '#ff8800';
            case 'средний': return '#ffcc00';
            case 'низкий': return '#44bb44';
            default: return '#888888';
        }
    };

    useEffect(() => {
        if (id) {
            const loadItem = async () => {
                try {
                    const data = await fetchIncidentById(id);
                    setIncidentData(data);
                } catch (err) {
                    setLoadError('Не удалось загрузить данные инцидента');
                }
            };
            loadItem();
        } else {
            fetchIncidents();
        }
    }, [id, fetchIncidents, fetchIncidentById]);

    if (loading && (id ? !incidentData : incidents.length === 0)) {
        return <Spinner text={id ? "Загрузка данных инцидента..." : "Загрузка инцидентов..."} />;
    }

    if (id && (loadError || (error && !incidentData))) {
        return (
            <ErrorMessage 
                message={loadError || error} 
                onRetry={() => window.location.reload()}
                onClose={() => navigate('/detail')}
            />
        );
    }

    if (!id && error && incidents.length === 0) {
        return (
            <ErrorMessage 
                message={error} 
                onRetry={fetchIncidents}
                onClose={clearError}
            />
        );
    }

    if (id) {
        if (!incidentData) {
            return <Spinner text="Загрузка..." />;
        }

        return (
            <div className="detail-container">
                <div className="detail-header">
                    <Link to="/detail" className="back-link">← Назад к списку</Link>
                </div>
                
                {error && (
                    <div className="error-banner">
                        ⚠️ {error}
                        <button onClick={clearError} className="error-close">✖</button>
                    </div>
                )}
                
                <div className="detail-card">
                    <div className="detail-title-row">
                        <h2>{incidentData.name}</h2>
                        <span 
                            className="severity-badge severity-badge-large"
                            style={{ backgroundColor: getSeverityColor(incidentData.severity) }}
                        >
                            {incidentData.severity}
                        </span>
                    </div>
                    
                    <div className="detail-info">
                        <div className="detail-row">
                            <span className="detail-label">📅 Дата инцидента:</span>
                            <span className="detail-value">{incidentData.date}</span>
                        </div>
                        
                        <div className="detail-row">
                            <span className="detail-label">📍 Место происшествия:</span>
                            <span className="detail-value">{incidentData.location}</span>
                        </div>
                        
                        <div className="detail-section">
                            <h3>📝 Описание инцидента</h3>
                            <p>{incidentData.description}</p>
                        </div>
                        
                        {incidentData.measures && (
                            <div className="detail-section">
                                <h3>✅ Принятые меры</h3>
                                <p>{incidentData.measures}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="incidents-container">
            <h2>🔍 Детализация инцидентов</h2>
            <p className="page-description">
                Выберите инцидент для просмотра подробной информации
            </p>
            
            {error && (
                <div className="error-banner">
                    ⚠️ {error}
                    <button onClick={clearError} className="error-close">✖</button>
                </div>
            )}
            
            {incidents.length === 0 ? (
                <div className="no-data-container">
                    <p className="no-data">Инциденты не зарегистрированы</p>
                    <Link to="/add" className="btn btn-primary">➕ Добавить первый инцидент</Link>
                </div>
            ) : (
                <div className="incidents-grid">
                    {incidents.map(item => (
                        <Link to={`/detail/${item.id}`} key={item.id} className="incident-card-link">
                            <div className="incident-card">
                                <div className="incident-header">
                                    <span 
                                        className="severity-badge"
                                        style={{ backgroundColor: getSeverityColor(item.severity) }}
                                    >
                                        {item.severity}
                                    </span>
                                    <span className="incident-date">{item.date}</span>
                                </div>
                                <h3>{item.name}</h3>
                                <p className="incident-location">📍 {item.location}</p>
                                <p className="incident-description">{item.description}</p>
                                <div className="incident-view-more">
                                    👁️ Подробнее →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Detail;
