import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useIncidents } from '../context/IncidentsContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

const Delete = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { incidents, fetchIncidents, fetchIncidentById, deleteIncident, loading, error, clearError } = useIncidents();
    
    const [incidentData, setIncidentData] = useState(null);
    const [loadError, setLoadError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteIncident(parseInt(id));
            alert("Инцидент успешно удален!");
            navigate('/delete');
        } catch (err) {
            setIsDeleting(false);
        }
    };

    if (loading && (id ? !incidentData : incidents.length === 0)) {
        return <Spinner text={id ? "Загрузка данных инцидента..." : "Загрузка инцидентов..."} />;
    }

    if (id && loadError) {
        return (
            <ErrorMessage 
                message={loadError} 
                onRetry={() => window.location.reload()}
                onClose={() => navigate('/delete')}
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

    if (isDeleting) {
        return <Spinner text="Удаление инцидента..." />;
    }

    if (id) {
        if (!incidentData) {
            return <Spinner text="Загрузка..." />;
        }

        return (
            <div className="delete-container">
                <div className="delete-header">
                    <Link to="/delete" className="back-link">← Назад к списку</Link>
                </div>
                
                <div className="delete-card">
                    <div className="delete-warning">
                        <span className="warning-icon">⚠️</span>
                        <h2>Подтверждение удаления</h2>
                    </div>
                    
                    <p className="delete-message">
                        Вы действительно хотите удалить следующий инцидент? 
                        <br />
                        <strong>Это действие нельзя отменить!</strong>
                    </p>
                    
                    {error && (
                        <ErrorMessage 
                            message={error} 
                            onClose={clearError}
                        />
                    )}
                    
                    <div className="delete-incident-preview">
                        <div className="preview-header">
                            <h3>{incidentData.name}</h3>
                            <span 
                                className="severity-badge"
                                style={{ backgroundColor: getSeverityColor(incidentData.severity) }}
                            >
                                {incidentData.severity}
                            </span>
                        </div>
                        
                        <div className="preview-info">
                            <p><strong>📅 Дата:</strong> {incidentData.date}</p>
                            <p><strong>📍 Место:</strong> {incidentData.location}</p>
                            <p><strong>📝 Описание:</strong> {incidentData.description}</p>
                        </div>
                    </div>
                    
                    <div className="delete-actions">
                        <button 
                            onClick={handleDelete} 
                            className="btn btn-delete btn-large"
                            disabled={loading || isDeleting}
                        >
                            🗑️ Да, удалить инцидент
                        </button>
                        <Link to="/delete" className="btn btn-cancel btn-large">
                            ❌ Отмена
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="incidents-container">
            <h2>🗑️ Удаление инцидентов</h2>
            <p className="page-description">
                Выберите инцидент для удаления
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
                    <p>Нечего удалять</p>
                </div>
            ) : (
                <div className="incidents-grid">
                    {incidents.map(item => (
                        <Link to={`/delete/${item.id}`} key={item.id} className="incident-card-link">
                            <div className="incident-card incident-card-delete">
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
                                <div className="incident-view-more incident-delete-action">
                                    🗑️ Удалить →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Delete;
