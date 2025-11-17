
import "./SobreNosotros.css";

/**
 * Componente React para la sección "Quiénes somos"
 */
const SobreNosotros = ({ className = "" }) => {
  return (
    <section className={`sn-container ${className}`} aria-labelledby="sobre-nosotros-title">

      {/* Encabezado con logo y título */}
      <div className="sn-header">
        <img src="/images/LogoDB.jpg" alt="Logo DBTecnologia" className="sn-logo" />
        <div>
          <h2 id="sobre-nosotros-title" className="sn-title">
            30 Años de Tecnología, Confianza e Innovación
          </h2>
          <p className="sn-lead">
            Desde hace más de tres décadas, acompañamos la evolución tecnológica con compromiso, calidad y una atención
            cercana. Nacimos con una misión clara:<br /> 
            <strong>Acercar la tecnología a las personas y las empresas</strong>.
          </p>
        </div>
      </div>

      {/* Cuerpo de texto */}
      <div className="sn-cta">
        <p className="sn-text">
          Con el paso del tiempo, crecimos junto a nuestros clientes, adaptándonos a los cambios del mercado y manteniendo
          siempre nuestros valores:<br /> 
          <strong>Responsabilidad, Innovación y Confianza</strong>.
        </p>

        <p className="sn-cta">
          Hoy, seguimos mirando hacia el futuro con la misma pasión que nos vio nacer, comprometidos en brindar
          <strong> productos, asesoramiento y servicio de excelencia</strong> en un mundo en constante transformación.
        </p>
      </div>

      {/* Contenedor centrado para el botón */}
      <div className="sn-cta">
        <a href="/contact" className="sn-button" aria-label="Contactar">
          Contactanos
        </a>
      </div>
      
    </section>
  );
};

export default SobreNosotros;
