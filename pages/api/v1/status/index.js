function status(request, response) {
  response.status(200).json({ chave: "It's Work!" });
}

export default status;
