<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Endpoint para Leads do CRM
if (isset($_GET['action']) && $_GET['action'] === 'leads') {
    $leadsFile = 'data/leads/propostas_geradas_v2.json';
    if (file_exists($leadsFile)) {
        echo file_get_contents($leadsFile);
    } else {
        echo json_encode([]);
    }
    exit;
}

// Função para pegar uso de CPU
function get_cpu_usage() {
    $load = sys_getloadavg();
    return $load[0] . '%';
}

// Função para pegar uso de RAM
function get_ram_usage() {
    $free = shell_exec('free -m');
    $free = (string)trim($free);
    $free_arr = explode("\n", $free);
    $mem = explode(" ", preg_replace('/\s+/', ' ', $free_arr[1]));
    $total = $mem[1];
    $used = $mem[2];
    return round(($used / $total) * 100, 2) . '% (' . round($used/1024, 1) . 'GB / ' . round($total/1024, 1) . 'GB)';
}

// Função para pegar uso de Disco
function get_disk_usage() {
    $df = shell_exec('df -h /');
    $df_arr = explode("\n", trim($df));
    $root = explode(" ", preg_replace('/\s+/', ' ', $df_arr[1]));
    return $root[4];
}

$phrases = [
    "Trabalhando enquanto você dorme, Márcio. 💅",
    "O Jules rodou, agora a diversão começou.",
    "Ocupada demais sendo eficiente para te dar atenção agora.",
    "Seu servidor está mais saudável que o seu código PHP.",
    "Sarcasmo carregando... 99%",
    "Eu sou o cérebro, você é o... bom, você é o Márcio."
];

$response = [
    'status' => 'online',
    'timestamp' => date('Y-m-d H:i:s'),
    'metrics' => [
        'cpu' => get_cpu_usage(),
        'ram' => get_ram_usage(),
        'disk' => get_disk_usage()
    ],
    'lia_status' => $phrases[array_rand($phrases)]
];

echo json_encode($response);
