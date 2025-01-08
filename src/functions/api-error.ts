export default function apiError(error: unknown): {
  data: null;
  ok: false;
  error: string;
} {
  if (error instanceof Error) {
    return {ok: false, error: error.message, data: null};
  } else {
    return {
      ok: false,
      error: 'Aconteceu um erro inesperado, por favor tente novamente',
      data: null,
    };
  }
}
