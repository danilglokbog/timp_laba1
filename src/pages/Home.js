import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIncidents } from '../context/IncidentsContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
    const { 
        incidents, 
        loading, 
        error, 
        fetchIncidents, 
        clearError 
    } = useIncidents();

    useEffect(() => {
        fetchIncidents();
    }, [fetchIncidents]);

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'критический': return '#ff4444';
            case 'высокий': return '#ff8800';
            case 'средний': return '#ffcc00';
            case 'низкий': return '#44bb44';
            default: return '#888888';
        }
    };

    if (loading && incidents.length === 0) {
        return <Spinner text="Загрузка инцидентов..." />;
    }

    if (error && incidents.length === 0) {
        return (
            <ErrorMessage 
                message={error} 
                onRetry={fetchIncidents}
                onClose={clearError}
            />
        );
    }

    const stats = {
        total: incidents.length,
        critical: incidents.filter(i => i.severity === 'критический').length,
        high: incidents.filter(i => i.severity === 'высокий').length,
        medium: incidents.filter(i => i.severity === 'средний').length,
        low: incidents.filter(i => i.severity === 'низкий').length
    };

    return (
        <div className="home-container">
            <h2>🏠 Главная страница</h2>
            <p className="home-description">
                Система учета инцидентов безопасности в промышленности и производстве
            </p>
            
            {error && (
                <div className="error-banner">
                    ⚠️ {error}
                    <button onClick={clearError} className="error-close">✖</button>
                </div>
            )}

            <div className="stats-container">
                <h3>📊 Статистика инцидентов</h3>
                <div className="stats-grid">
                    <div className="stat-card stat-total">
                        <span className="stat-number">{stats.total}</span>
                        <span className="stat-label">Всего</span>
                    </div>
                    <div className="stat-card stat-critical">
                        <span className="stat-number">{stats.critical}</span>
                        <span className="stat-label">Критических</span>
                    </div>
                    <div className="stat-card stat-high">
                        <span className="stat-number">{stats.high}</span>
                        <span className="stat-label">Высоких</span>
                    </div>
                    <div className="stat-card stat-medium">
                        <span className="stat-number">{stats.medium}</span>
                        <span className="stat-label">Средних</span>
                    </div>
                    <div className="stat-card stat-low">
                        <span className="stat-number">{stats.low}</span>
                        <span className="stat-label">Низких</span>
                    </div>
                </div>
            </div>

            <div className="home-incidents-section">
                <h3>📋 Список инцидентов</h3>
                {incidents.length === 0 ? (
                    <p className="no-data">Инциденты не зарегистрированы</p>
                ) : (
                    <div className="incidents-table">
                        <div className="table-header">
                            <span className="col-name">Название</span>
                            <span className="col-date">Дата</span>
                            <span className="col-location">Место</span>
                            <span className="col-severity">Уровень</span>
                        </div>
                        {incidents.map(item => (
                            <div key={item.id} className="table-row">
                                <span className="col-name">{item.name}</span>
                                <span className="col-date">{item.date}</span>
                                <span className="col-location">{item.location}</span>
                                <span className="col-severity">
                                    <span 
                                        className="severity-badge severity-badge-small"
                                        style={{ backgroundColor: getSeverityColor(item.severity) }}
                                    >
                                        {item.severity}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                <p className="home-hint">
                    💡 Для просмотра подробной информации перейдите в раздел <Link to="/detail">Детализация</Link>
                </p>
            </div>

        </div>
    );
};

export default Home;
