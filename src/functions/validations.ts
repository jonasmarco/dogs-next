export function validateLogin(username: string, password: string) {
  const errors: Record<string, boolean> = {};

  if (!username) errors.username = true;
  if (!password) errors.password = true;

  if (Object.keys(errors).length > 0) {
    const error: ValidationError = new Error('Informe usuário e senha');
    error.validationErrors = errors;
    throw error;
  }

  return {username, password};
}

export function validateUserPost(
  username: string,
  email: string,
  password: string,
) {
  const errors: Record<string, boolean> = {};

  if (!username) errors.username = true;
  if (!email) errors.email = true;
  if (!password) errors.password = true;

  if (Object.keys(errors).length > 0) {
    const error: ValidationError = new Error('Informe usuário, e-mail e senha');
    error.validationErrors = errors;
    throw error;
  }

  return {username, email, password};
}

export function validatePasswordLost(login: string, urlPerdeu: string) {
  const errors: Record<string, boolean> = {};

  if (!login) errors.login = true;
  if (!urlPerdeu) errors.urlPerdeu = true;

  if (Object.keys(errors).length > 0) {
    const error: ValidationError = new Error('Informe usuário ou e-mail');
    error.validationErrors = errors;
    throw error;
  }

  return {login};
}

export function validatePasswordReset(
  login: string,
  key: string,
  password: string,
) {
  const errors: Record<string, boolean> = {};

  if (!login) errors.login = true;
  if (!key) errors.key = true;
  if (!password) errors.password = true;

  if (Object.keys(errors).length > 0) {
    const error: ValidationError = new Error('Informe uma nova senha');
    error.validationErrors = errors;
    throw error;
  }

  return {login, key, password};
}

export const validatePhotoPost = (
  token: string | undefined,
  nome: string,
  idade: string,
  peso: string,
  img: File,
) => {
  const errors: Record<string, boolean> = {};

  if (!token) errors.token = true;
  if (!nome) errors.nome = true;
  if (!idade) errors.idade = true;
  if (!peso) errors.peso = true;
  if (!img || img.size === 0) errors.img = true;

  if (Object.keys(errors).length > 0) {
    const error: ValidationError = new Error('Informe todos os campos');
    error.validationErrors = errors;
    throw error;
  }

  return {nome, idade, peso, img};
};

export const validatePhotoDelete = (token: string | undefined, id: string) => {
  const errors: Record<string, boolean> = {};

  if (!token) errors.token = true;
  if (!id) errors.id = true;

  if (Object.keys(errors).length > 0) {
    const error: ValidationError = new Error('Token ou id inválidos');
    error.validationErrors = errors;
    throw error;
  }

  return {id};
};

export const validateCommentPost = (
  token: string | undefined,
  comment: string,
  id: string,
) => {
  const errors: Record<string, boolean> = {};

  if (!token) errors.token = true;
  if (!comment) errors.comment = true;
  if (!id) errors.id = true;

  if (Object.keys(errors).length > 0) {
    const error: ValidationError = new Error('Informe um comentário');
    error.validationErrors = errors;
    throw error;
  }

  return {comment, id};
};

export const validateStatsGet = (token: string | undefined) => {
  const errors: Record<string, boolean> = {};

  if (!token) errors.token = true;

  if (Object.keys(errors).length > 0) {
    const error: ValidationError = new Error('Não autorizado');
    error.validationErrors = errors;
    throw error;
  }

  return {token};
};
