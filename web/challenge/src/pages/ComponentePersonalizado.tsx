import React, { useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface PersonalizadoValue {
  valido: boolean;
}

interface FormValues {
  personalizado: PersonalizadoValue;
}

type ComponentePersonalizadoProps = Omit<
  ControllerRenderProps<FormValues, 'personalizado.valido'>,
  'ref'
>;

const ComponentePersonalizado = React.forwardRef<
  HTMLDivElement,
  ComponentePersonalizadoProps
>(({ value, onChange, onBlur, name }, ref) => {
  const [estadoValido, setEstadoValido] = useState<boolean>(value || true);

  useEffect(() => {
    onChange(estadoValido);
  }, [estadoValido, onChange]);

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={() => setEstadoValido((prev) => !prev)}
      >
        {estadoValido ? 'Marcar como Inválido' : 'Marcar como Válido'}
      </button>
    </div>
  );
});

export default ComponentePersonalizado;
