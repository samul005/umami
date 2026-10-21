$files = Get-ChildItem -Path "c:\Users\Aditya\Documents\antigravity\magical-davinci\vistiq\public\intl\messages\*.json"
foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw
    $newContent = $content -replace 'Umami', 'Vistiq'
    if ($newContent -ne $content) {
        Set-Content -Path $f.FullName -Value $newContent -NoNewline
        Write-Output "Updated $($f.Name)"
    }
}
Write-Output "All locale messages processed."
