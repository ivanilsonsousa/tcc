interface Props {
  customMessage?: string;
}

export const LoadingDefault = ({ customMessage }: Props) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md shadow-lg">
        {customMessage ? (
          customMessage
        ) : (
          <div className="flex items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            <span className="ml-2 text-xl">Carregando...</span>
          </div>
        )}
      </div>
    </div>
  );
};
