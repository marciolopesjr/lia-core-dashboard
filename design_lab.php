<?php
/**
 * LIA_DESIGN_LAB v1.0 💅
 * Backend para disparar a geração de logos via ImageMagick
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Tipo de logo solicitado
$type = $_GET['type'] ?? 'round';

// Executa o script de geração (fabrica_sks.sh)
// O script gera múltiplos arquivos, aqui mapeamos o retorno para o solicitado
$output = shell_exec("bash scripts/fabrica_sks.sh 2>&1");

$imagePath = '';
switch ($type) {
    case 'round':
        $imagePath = 'assets/branding/sks_round_v1.png';
        break;
    case 'dark':
        $imagePath = 'assets/branding/sks_round_dark_v1.png';
        break;
    case 'banner':
        $imagePath = 'assets/branding/sks_banner_v1.png';
        break;
    default:
        $imagePath = 'assets/branding/sks_round_v1.png';
}

// Verifica se o arquivo existe após a execução
if (file_exists($imagePath)) {
    echo json_encode([
        'success' => true,
        'message' => 'Logo gerado com sucesso!',
        'image' => $imagePath,
        'type' => $type,
        'timestamp' => time()
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao gerar o logo.',
        'output' => $output
    ]);
}
