# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

function ConvertTo-ScriptExtent {
    <#
    .EXTERNALHELP ..\PowerShellEditorServices.Commands-help.xml
    #>
    [CmdletBinding()]
    [OutputType([System.Management.Automation.Language.IScriptExtent])]
    param(
        [Parameter(Mandatory, ValueFromPipelineByPropertyName, ParameterSetName = 'ByOffset')]
        [Alias('StartOffset', 'Offset')]
        [int] $StartOffsetNumber,

        [Parameter(ValueFromPipelineByPropertyName, ParameterSetName = 'ByOffset')]
        [Alias('EndOffset')]
        [int] $EndOffsetNumber,

        [Parameter(ValueFromPipelineByPropertyName, ParameterSetName = 'ByPosition')]
        [Alias('StartLine', 'Line')]
        [int] $StartLineNumber,

        [Parameter(ValueFromPipelineByPropertyName, ParameterSetName = 'ByPosition')]
        [Alias('StartColumn', 'Column')]
        [int] $StartColumnNumber,

        [Parameter(ValueFromPipelineByPropertyName, ParameterSetName = 'ByPosition')]
        [Alias('EndLine')]
        [int] $EndLineNumber,

        [Parameter(ValueFromPipelineByPropertyName, ParameterSetName = 'ByPosition')]
        [Alias('EndColumn')]
        [int] $EndColumnNumber,

        [Parameter(ValueFromPipelineByPropertyName, ParameterSetName = 'ByPosition')]
        [Parameter(ValueFromPipelineByPropertyName, ParameterSetName = 'ByOffset')]
        [Parameter(ValueFromPipelineByPropertyName, ParameterSetName = 'ByBuffer')]
        [Alias('File', 'FileName')]
        [string] $FilePath = $psEditor.GetEditorContext().CurrentFile.Path,

        [Parameter(ValueFromPipelineByPropertyName, ParameterSetName = 'ByBuffer')]
        [Alias('Start')]
        [Microsoft.PowerShell.EditorServices.Extensions.IFilePosition, Microsoft.PowerShell.EditorServices] $StartBuffer,

        [Parameter(ValueFromPipelineByPropertyName, ParameterSetName = 'ByBuffer')]
        [Alias('End')]
        [Microsoft.PowerShell.EditorServices.Extensions.IFilePosition, Microsoft.PowerShell.EditorServices] $EndBuffer,

        [Parameter(Mandatory, ValueFromPipeline, ValueFromPipelineByPropertyName, ParameterSetName = 'ByExtent')]
        [System.Management.Automation.Language.IScriptExtent] $Extent
    )
    begin {
        $fileContext = $psEditor.GetEditorContext().CurrentFile
        $emptyExtent = [Microsoft.PowerShell.EditorServices.Extensions.FileScriptExtent, Microsoft.PowerShell.EditorServices]::Empty
    }
    process {
        # Already a InternalScriptExtent, FileScriptExtent or is empty.
        $returnAsIs = $Extent -and
            ($Extent.StartOffset -or $Extent.EndOffset -or $Extent -eq $emptyExtent)

        if ($returnAsIs) {
            return $Extent
        }

        if ($StartOffsetNumber) {
            $startOffset = $StartOffsetNumber
            $endOffset = $EndOffsetNumber

            # Allow creating a single position extent with just the offset parameter.
            if (-not $EndOffsetNumber) {
                $endOffset = $startOffset
            }

            return [Microsoft.PowerShell.EditorServices.Extensions.FileScriptExtent, Microsoft.PowerShell.EditorServices]::FromOffsets(
                $fileContext,
                $startOffset,
                $endOffset)
        }

        if ($StartBuffer) {
            if (-not $EndBuffer) {
                $EndBuffer = $StartBuffer
            }

            return [Microsoft.PowerShell.EditorServices.Extensions.FileScriptExtent, Microsoft.PowerShell.EditorServices]::FromPositions(
                $fileContext,
                $StartBuffer.Line,
                $StartBuffer.Column,
                $EndBuffer.Line,
                $EndBuffer.Column)
        }

        # Allow piping a single line and column to get a zero length script extent.
        if ($PSBoundParameters.ContainsKey('StartColumnNumber') -and -not $PSBoundParameters.ContainsKey('EndColumnNumber')) {
            $EndColumnNumber = $StartColumnNumber
        }

        if ($PSBoundParameters.ContainsKey('StartLineNumber') -and -not $PSBoundParameters.ContainsKey('EndLineNumber')) {
            $EndLineNumber = $StartLineNumber
        }

        # Protect against zero as a value since lines and columns start at 1
        if (-not $StartColumnNumber) {
            $StartColumnNumber = 1
        }

        if (-not $StartLineNumber) {
            $StartLineNumber = 1
        }

        if (-not $EndLineNumber) {
            $EndLineNumber = 1
        }

        if (-not $EndColumnNumber) {
            $EndColumnNumber = 1
        }

        return [Microsoft.PowerShell.EditorServices.Extensions.FileScriptExtent, Microsoft.PowerShell.EditorServices]::FromPositions(
            $fileContext,
            $StartLineNumber,
            $StartColumnNumber,
            $EndLineNumber,
            $EndColumnNumber)
    }
}

# SIG # Begin signature block
# MIIoKgYJKoZIhvcNAQcCoIIoGzCCKBcCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCArNi6HQ5eMUAz9
# cXhU8YSv7SRI9434IV7YYDMjrPkUZaCCDXYwggX0MIID3KADAgECAhMzAAAEBGx0
# Bv9XKydyAAAAAAQEMA0GCSqGSIb3DQEBCwUAMH4xCzAJBgNVBAYTAlVTMRMwEQYD
# VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25p
# bmcgUENBIDIwMTEwHhcNMjQwOTEyMjAxMTE0WhcNMjUwOTExMjAxMTE0WjB0MQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMR4wHAYDVQQDExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
# AQC0KDfaY50MDqsEGdlIzDHBd6CqIMRQWW9Af1LHDDTuFjfDsvna0nEuDSYJmNyz
# NB10jpbg0lhvkT1AzfX2TLITSXwS8D+mBzGCWMM/wTpciWBV/pbjSazbzoKvRrNo
# DV/u9omOM2Eawyo5JJJdNkM2d8qzkQ0bRuRd4HarmGunSouyb9NY7egWN5E5lUc3
# a2AROzAdHdYpObpCOdeAY2P5XqtJkk79aROpzw16wCjdSn8qMzCBzR7rvH2WVkvF
# HLIxZQET1yhPb6lRmpgBQNnzidHV2Ocxjc8wNiIDzgbDkmlx54QPfw7RwQi8p1fy
# 4byhBrTjv568x8NGv3gwb0RbAgMBAAGjggFzMIIBbzAfBgNVHSUEGDAWBgorBgEE
# AYI3TAgBBggrBgEFBQcDAzAdBgNVHQ4EFgQU8huhNbETDU+ZWllL4DNMPCijEU4w
# RQYDVR0RBD4wPKQ6MDgxHjAcBgNVBAsTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEW
# MBQGA1UEBRMNMjMwMDEyKzUwMjkyMzAfBgNVHSMEGDAWgBRIbmTlUAXTgqoXNzci
# tW2oynUClTBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
# b20vcGtpb3BzL2NybC9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDctMDguY3JsMGEG
# CCsGAQUFBwEBBFUwUzBRBggrBgEFBQcwAoZFaHR0cDovL3d3dy5taWNyb3NvZnQu
# Y29tL3BraW9wcy9jZXJ0cy9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDctMDguY3J0
# MAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQELBQADggIBAIjmD9IpQVvfB1QehvpC
# Ge7QeTQkKQ7j3bmDMjwSqFL4ri6ae9IFTdpywn5smmtSIyKYDn3/nHtaEn0X1NBj
# L5oP0BjAy1sqxD+uy35B+V8wv5GrxhMDJP8l2QjLtH/UglSTIhLqyt8bUAqVfyfp
# h4COMRvwwjTvChtCnUXXACuCXYHWalOoc0OU2oGN+mPJIJJxaNQc1sjBsMbGIWv3
# cmgSHkCEmrMv7yaidpePt6V+yPMik+eXw3IfZ5eNOiNgL1rZzgSJfTnvUqiaEQ0X
# dG1HbkDv9fv6CTq6m4Ty3IzLiwGSXYxRIXTxT4TYs5VxHy2uFjFXWVSL0J2ARTYL
# E4Oyl1wXDF1PX4bxg1yDMfKPHcE1Ijic5lx1KdK1SkaEJdto4hd++05J9Bf9TAmi
# u6EK6C9Oe5vRadroJCK26uCUI4zIjL/qG7mswW+qT0CW0gnR9JHkXCWNbo8ccMk1
# sJatmRoSAifbgzaYbUz8+lv+IXy5GFuAmLnNbGjacB3IMGpa+lbFgih57/fIhamq
# 5VhxgaEmn/UjWyr+cPiAFWuTVIpfsOjbEAww75wURNM1Imp9NJKye1O24EspEHmb
# DmqCUcq7NqkOKIG4PVm3hDDED/WQpzJDkvu4FrIbvyTGVU01vKsg4UfcdiZ0fQ+/
# V0hf8yrtq9CkB8iIuk5bBxuPMIIHejCCBWKgAwIBAgIKYQ6Q0gAAAAAAAzANBgkq
# hkiG9w0BAQsFADCBiDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
# EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
# bjEyMDAGA1UEAxMpTWljcm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
# IDIwMTEwHhcNMTEwNzA4MjA1OTA5WhcNMjYwNzA4MjEwOTA5WjB+MQswCQYDVQQG
# EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
# A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQg
# Q29kZSBTaWduaW5nIFBDQSAyMDExMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIIC
# CgKCAgEAq/D6chAcLq3YbqqCEE00uvK2WCGfQhsqa+laUKq4BjgaBEm6f8MMHt03
# a8YS2AvwOMKZBrDIOdUBFDFC04kNeWSHfpRgJGyvnkmc6Whe0t+bU7IKLMOv2akr
# rnoJr9eWWcpgGgXpZnboMlImEi/nqwhQz7NEt13YxC4Ddato88tt8zpcoRb0Rrrg
# OGSsbmQ1eKagYw8t00CT+OPeBw3VXHmlSSnnDb6gE3e+lD3v++MrWhAfTVYoonpy
# 4BI6t0le2O3tQ5GD2Xuye4Yb2T6xjF3oiU+EGvKhL1nkkDstrjNYxbc+/jLTswM9
# sbKvkjh+0p2ALPVOVpEhNSXDOW5kf1O6nA+tGSOEy/S6A4aN91/w0FK/jJSHvMAh
# dCVfGCi2zCcoOCWYOUo2z3yxkq4cI6epZuxhH2rhKEmdX4jiJV3TIUs+UsS1Vz8k
# A/DRelsv1SPjcF0PUUZ3s/gA4bysAoJf28AVs70b1FVL5zmhD+kjSbwYuER8ReTB
# w3J64HLnJN+/RpnF78IcV9uDjexNSTCnq47f7Fufr/zdsGbiwZeBe+3W7UvnSSmn
# Eyimp31ngOaKYnhfsi+E11ecXL93KCjx7W3DKI8sj0A3T8HhhUSJxAlMxdSlQy90
# lfdu+HggWCwTXWCVmj5PM4TasIgX3p5O9JawvEagbJjS4NaIjAsCAwEAAaOCAe0w
# ggHpMBAGCSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQWBBRIbmTlUAXTgqoXNzcitW2o
# ynUClTAZBgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYD
# VR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBRyLToCMZBDuRQFTuHqp8cx0SOJNDBa
# BgNVHR8EUzBRME+gTaBLhklodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
# bC9wcm9kdWN0cy9NaWNSb29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3JsMF4GCCsG
# AQUFBwEBBFIwUDBOBggrBgEFBQcwAoZCaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
# L3BraS9jZXJ0cy9NaWNSb29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3J0MIGfBgNV
# HSAEgZcwgZQwgZEGCSsGAQQBgjcuAzCBgzA/BggrBgEFBQcCARYzaHR0cDovL3d3
# dy5taWNyb3NvZnQuY29tL3BraW9wcy9kb2NzL3ByaW1hcnljcHMuaHRtMEAGCCsG
# AQUFBwICMDQeMiAdAEwAZQBnAGEAbABfAHAAbwBsAGkAYwB5AF8AcwB0AGEAdABl
# AG0AZQBuAHQALiAdMA0GCSqGSIb3DQEBCwUAA4ICAQBn8oalmOBUeRou09h0ZyKb
# C5YR4WOSmUKWfdJ5DJDBZV8uLD74w3LRbYP+vj/oCso7v0epo/Np22O/IjWll11l
# hJB9i0ZQVdgMknzSGksc8zxCi1LQsP1r4z4HLimb5j0bpdS1HXeUOeLpZMlEPXh6
# I/MTfaaQdION9MsmAkYqwooQu6SpBQyb7Wj6aC6VoCo/KmtYSWMfCWluWpiW5IP0
# wI/zRive/DvQvTXvbiWu5a8n7dDd8w6vmSiXmE0OPQvyCInWH8MyGOLwxS3OW560
# STkKxgrCxq2u5bLZ2xWIUUVYODJxJxp/sfQn+N4sOiBpmLJZiWhub6e3dMNABQam
# ASooPoI/E01mC8CzTfXhj38cbxV9Rad25UAqZaPDXVJihsMdYzaXht/a8/jyFqGa
# J+HNpZfQ7l1jQeNbB5yHPgZ3BtEGsXUfFL5hYbXw3MYbBL7fQccOKO7eZS/sl/ah
# XJbYANahRr1Z85elCUtIEJmAH9AAKcWxm6U/RXceNcbSoqKfenoi+kiVH6v7RyOA
# 9Z74v2u3S5fi63V4GuzqN5l5GEv/1rMjaHXmr/r8i+sLgOppO6/8MO0ETI7f33Vt
# Y5E90Z1WTk+/gFcioXgRMiF670EKsT/7qMykXcGhiJtXcVZOSEXAQsmbdlsKgEhr
# /Xmfwb1tbWrJUnMTDXpQzTGCGgowghoGAgEBMIGVMH4xCzAJBgNVBAYTAlVTMRMw
# EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
# aWNyb3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNp
# Z25pbmcgUENBIDIwMTECEzMAAAQEbHQG/1crJ3IAAAAABAQwDQYJYIZIAWUDBAIB
# BQCgga4wGQYJKoZIhvcNAQkDMQwGCisGAQQBgjcCAQQwHAYKKwYBBAGCNwIBCzEO
# MAwGCisGAQQBgjcCARUwLwYJKoZIhvcNAQkEMSIEIPdDfua2HoHSC+WsA9Kd4vwx
# /69pMrly3wNqXl3Q9Zb6MEIGCisGAQQBgjcCAQwxNDAyoBSAEgBNAGkAYwByAG8A
# cwBvAGYAdKEagBhodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEB
# BQAEggEAXDfJsDat31+UiqlTP2f4hnsyE9WGNS1Q1kBxMCGwUWKHNlAery3LchE3
# G0voyrFvDJR/ikI/tkV+7uQGw9GDTXbBsNeVNJ8ZujL5nqYNSWeDtij/bjaMiipR
# x3xBY0NAwJrc/yqidHYGhz4YHxgf5+v1p935ShXKmMuGx2PvlloBgsMg59UsHjWq
# e65dj03spyObRFoJrt8nkGceZevxyqWefxZGL6UKckaE5vh00v53mZ1MIoVFHxlv
# 9tv+0JRbpdQemKN+8S6SPcTaGVr73EvcSB/ouAzyZiP6afukpvDBDNDeTFzWK/qO
# Z6vIH7t9VpdNBO33U1U4pnGvJPNWraGCF5QwgheQBgorBgEEAYI3AwMBMYIXgDCC
# F3wGCSqGSIb3DQEHAqCCF20wghdpAgEDMQ8wDQYJYIZIAWUDBAIBBQAwggFSBgsq
# hkiG9w0BCRABBKCCAUEEggE9MIIBOQIBAQYKKwYBBAGEWQoDATAxMA0GCWCGSAFl
# AwQCAQUABCA1c5RiRsOGHal5lAKvjIykc08WybXkQvUyGhh7u65qMgIGaEreysQ9
# GBMyMDI1MDYyNjEzNTEzMS4xODNaMASAAgH0oIHRpIHOMIHLMQswCQYDVQQGEwJV
# UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
# ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSUwIwYDVQQLExxNaWNyb3NvZnQgQW1l
# cmljYSBPcGVyYXRpb25zMScwJQYDVQQLEx5uU2hpZWxkIFRTUyBFU046QTAwMC0w
# NUUwLUQ5NDcxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2Wg
# ghHqMIIHIDCCBQigAwIBAgITMwAAAgh4nVhdksfZUgABAAACCDANBgkqhkiG9w0B
# AQsFADB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
# BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
# VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDAeFw0yNTAxMzAxOTQy
# NTNaFw0yNjA0MjIxOTQyNTNaMIHLMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
# aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENv
# cnBvcmF0aW9uMSUwIwYDVQQLExxNaWNyb3NvZnQgQW1lcmljYSBPcGVyYXRpb25z
# MScwJQYDVQQLEx5uU2hpZWxkIFRTUyBFU046QTAwMC0wNUUwLUQ5NDcxJTAjBgNV
# BAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2UwggIiMA0GCSqGSIb3DQEB
# AQUAA4ICDwAwggIKAoICAQC1y3AI5lIz3Ip1nK5BMUUbGRsjSnCz/VGs33zvY0Ne
# shsPgfld3/Z3/3dS8WKBLlDlosmXJOZlFSiNXUd6DTJxA9ik/ZbCdWJ78LKjbN3t
# FkX2c6RRpRMpA8sq/oBbRryP3c8Q/gxpJAKHHz8cuSn7ewfCLznNmxqliTk3Q5LH
# qz2PjeYKD/dbKMBT2TAAWAvum4z/HXIJ6tFdGoNV4WURZswCSt6ROwaqQ1oAYGvE
# ndH+DXZq1+bHsgvcPNCdTSIpWobQiJS/UKLiR02KNCqB4I9yajFTSlnMIEMz/Ni5
# 38oGI64phcvNpUe2+qaKWHZ8d4T1KghvRmSSF4YF5DNEJbxaCUwsy7nULmsFnTaO
# jVOoTFWWfWXvBuOKkBcQKWGKvrki976j4x+5ezAP36fq3u6dHRJTLZAu4dEuOooU
# 3+kMZr+RBYWjTHQCKV+yZ1ST0eGkbHXoA2lyyRDlNjBQcoeZIxWCZts/d3+nf1ji
# SLN6f6wdHaUz0ADwOTQ/aEo1IC85eFePvyIKaxFJkGU2Mqa6Xzq3qCq5tokIHtjh
# ogsrEgfDKTeFXTtdhl1IPtLcCfMcWOGGAXosVUU7G948F6W96424f2VHD8L3FoyA
# I9+r4zyIQUmqiESzuQWeWpTTjFYwCmgXaGOuSDV8cNOVQB6IPzPneZhVTjwxbAZl
# aQIDAQABo4IBSTCCAUUwHQYDVR0OBBYEFKMx4vfOqcUTgYOVB9f18/mhegFNMB8G
# A1UdIwQYMBaAFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMF8GA1UdHwRYMFYwVKBSoFCG
# Tmh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY3JsL01pY3Jvc29mdCUy
# MFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNybDBsBggrBgEFBQcBAQRgMF4w
# XAYIKwYBBQUHMAKGUGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2Vy
# dHMvTWljcm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAoMSkuY3J0MAwG
# A1UdEwEB/wQCMAAwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgwDgYDVR0PAQH/BAQD
# AgeAMA0GCSqGSIb3DQEBCwUAA4ICAQBRszKJKwAfswqdaQPFiaYB/ZNAYWDa040X
# TcQsCaCua5nsG1IslYaSpH7miTLr6eQEqXczZoqeOa/xvDnMGifGNda0CHbQwtpn
# IhsutrKO2jhjEaGwlJgOMql21r7Ik6XnBza0e3hBOu4UBkMl/LEX+AURt7i7+RTN
# sGN0cXPwPSbTFE+9z7WagGbY9pwUo/NxkGJseqGCQ/9K2VMU74bw5e7+8IGUhM2x
# spJPqnSeHPhYmcB0WclOxcVIfj/ZuQvworPbTEEYDVCzSN37c0yChPMY7FJ+HGFB
# NJxwd5lKIr7GYfq8a0gOiC2ljGYlc4rt4cCed1XKg83f0l9aUVimWBYXtfNebhpf
# r6Lc3jD8NgsrDhzt0WgnIdnTZCi7jxjsIBilH99pY5/h6bQcLKK/E6KCP9E1YN78
# fLaOXkXMyO6xLrvQZ+uCSi1hdTufFC7oSB/CU5RbfIVHXG0j1o2n1tne4eCbNfKq
# UPTE31tNbWBR23Yiy0r3kQmHeYE1GLbL4pwknqaip1BRn6WIUMJtgncawEN33f8A
# YGZ4a3NnHopzGVV6neffGVag4Tduy+oy1YF+shChoXdMqfhPWFpHe3uJGT4GJEiN
# s4+28a/wHUuF+aRaR0cN5P7XlOwU1360iUCJtQdvKQaNAwGI29KOwS3QGriR9F2j
# OGPUAlpeEzCCB3EwggVZoAMCAQICEzMAAAAVxedrngKbSZkAAAAAABUwDQYJKoZI
# hvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
# DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
# MjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAy
# MDEwMB4XDTIxMDkzMDE4MjIyNVoXDTMwMDkzMDE4MzIyNVowfDELMAkGA1UEBhMC
# VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
# BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRp
# bWUtU3RhbXAgUENBIDIwMTAwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
# AQDk4aZM57RyIQt5osvXJHm9DtWC0/3unAcH0qlsTnXIyjVX9gF/bErg4r25Phdg
# M/9cT8dm95VTcVrifkpa/rg2Z4VGIwy1jRPPdzLAEBjoYH1qUoNEt6aORmsHFPPF
# dvWGUNzBRMhxXFExN6AKOG6N7dcP2CZTfDlhAnrEqv1yaa8dq6z2Nr41JmTamDu6
# GnszrYBbfowQHJ1S/rboYiXcag/PXfT+jlPP1uyFVk3v3byNpOORj7I5LFGc6XBp
# Dco2LXCOMcg1KL3jtIckw+DJj361VI/c+gVVmG1oO5pGve2krnopN6zL64NF50Zu
# yjLVwIYwXE8s4mKyzbnijYjklqwBSru+cakXW2dg3viSkR4dPf0gz3N9QZpGdc3E
# XzTdEonW/aUgfX782Z5F37ZyL9t9X4C626p+Nuw2TPYrbqgSUei/BQOj0XOmTTd0
# lBw0gg/wEPK3Rxjtp+iZfD9M269ewvPV2HM9Q07BMzlMjgK8QmguEOqEUUbi0b1q
# GFphAXPKZ6Je1yh2AuIzGHLXpyDwwvoSCtdjbwzJNmSLW6CmgyFdXzB0kZSU2LlQ
# +QuJYfM2BjUYhEfb3BvR/bLUHMVr9lxSUV0S2yW6r1AFemzFER1y7435UsSFF5PA
# PBXbGjfHCBUYP3irRbb1Hode2o+eFnJpxq57t7c+auIurQIDAQABo4IB3TCCAdkw
# EgYJKwYBBAGCNxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQUKqdS/mTEmr6CkTxG
# NSnPEP8vBO4wHQYDVR0OBBYEFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMFwGA1UdIARV
# MFMwUQYMKwYBBAGCN0yDfQEBMEEwPwYIKwYBBQUHAgEWM2h0dHA6Ly93d3cubWlj
# cm9zb2Z0LmNvbS9wa2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTATBgNVHSUEDDAK
# BggrBgEFBQcDCDAZBgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMC
# AYYwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2UkFvX
# zpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20v
# cGtpL2NybC9wcm9kdWN0cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYI
# KwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5j
# b20vcGtpL2NlcnRzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNydDANBgkqhkiG
# 9w0BAQsFAAOCAgEAnVV9/Cqt4SwfZwExJFvhnnJL/Klv6lwUtj5OR2R4sQaTlz0x
# M7U518JxNj/aZGx80HU5bbsPMeTCj/ts0aGUGCLu6WZnOlNN3Zi6th542DYunKmC
# VgADsAW+iehp4LoJ7nvfam++Kctu2D9IdQHZGN5tggz1bSNU5HhTdSRXud2f8449
# xvNo32X2pFaq95W2KFUn0CS9QKC/GbYSEhFdPSfgQJY4rPf5KYnDvBewVIVCs/wM
# nosZiefwC2qBwoEZQhlSdYo2wh3DYXMuLGt7bj8sCXgU6ZGyqVvfSaN0DLzskYDS
# PeZKPmY7T7uG+jIa2Zb0j/aRAfbOxnT99kxybxCrdTDFNLB62FD+CljdQDzHVG2d
# Y3RILLFORy3BFARxv2T5JL5zbcqOCb2zAVdJVGTZc9d/HltEAY5aGZFrDZ+kKNxn
# GSgkujhLmm77IVRrakURR6nxt67I6IleT53S0Ex2tVdUCbFpAUR+fKFhbHP+Crvs
# QWY9af3LwUFJfn6Tvsv4O+S3Fb+0zj6lMVGEvL8CwYKiexcdFYmNcP7ntdAoGokL
# jzbaukz5m/8K6TT4JDVnK+ANuOaMmdbhIurwJ0I9JZTmdHRbatGePu1+oDEzfbzL
# 6Xu/OHBE0ZDxyKs6ijoIYn/ZcGNTTY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggNN
# MIICNQIBATCB+aGB0aSBzjCByzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
# bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
# b3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0aW9uczEn
# MCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOkEwMDAtMDVFMC1EOTQ3MSUwIwYDVQQD
# ExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNloiMKAQEwBwYFKw4DAhoDFQCN
# kvu0NKcSjdYKyrhJZcsyXOUTNKCBgzCBgKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYD
# VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1w
# IFBDQSAyMDEwMA0GCSqGSIb3DQEBCwUAAgUA7AcoSDAiGA8yMDI1MDYyNjAyMDA0
# MFoYDzIwMjUwNjI3MDIwMDQwWjB0MDoGCisGAQQBhFkKBAExLDAqMAoCBQDsByhI
# AgEAMAcCAQACAgXHMAcCAQACAhITMAoCBQDsCHnIAgEAMDYGCisGAQQBhFkKBAIx
# KDAmMAwGCisGAQQBhFkKAwKgCjAIAgEAAgMHoSChCjAIAgEAAgMBhqAwDQYJKoZI
# hvcNAQELBQADggEBALH7zWpkq2lssfRC44ruuaPIo6aXEafJXm4bcmuIDzG8akmZ
# xJEfr/u7vQcjlSzqZyAtNijOz+GUi6rY/nvmrItbBL2qJw0Pln92CEIAW/RUTK6D
# 43PsQCFxmgkOipPLIxu3MmU9uRlW306rTbdTrfTRzN+UPu1JdVtilbRbhC9jBLgz
# UXvMY7uaEEITWX0W/K6hh4V019HZhfAzadYGJ6af2CdePnKloGk1QJUOl/zytF/d
# ROlxJOJXsC4jbKs5IPewjU11cSiXxDFKbf2UrCdTP011A/D2YqPvCljxsYHIjI6h
# 6ucAXf6mTPJa5qFbhYUxR4F5KCPZSC546O876cExggQNMIIECQIBATCBkzB8MQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNy
# b3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAgh4nVhdksfZUgABAAACCDAN
# BglghkgBZQMEAgEFAKCCAUowGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMC8G
# CSqGSIb3DQEJBDEiBCDeoCjZ+QUOKZrQlCYrrK6c8cnDGNnHvpjafKXP5R8IGzCB
# +gYLKoZIhvcNAQkQAi8xgeowgecwgeQwgb0EII//jm8JHa2W1O9778t9+Ft2Z5Nm
# KqttPk6Q+9RRpmepMIGYMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
# c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
# b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
# MTACEzMAAAIIeJ1YXZLH2VIAAQAAAggwIgQg+G59l4hUgsvkk+ERnoRck1PqP5RU
# pDqqBTwDbtDH+mcwDQYJKoZIhvcNAQELBQAEggIAm/AEqtCczCeLvyrG9terfOgL
# 14oWkEtvi49rE8QSXkf4/juLc6MBpXOxDDWESTJGnaEcnIM/ppdowUF6KkBnTdIv
# joIKgXKs1nsM6bPJN01GmX6dPtoDAfFIn5Qy89ZbE+VtdMb3NS0MpII681/soVNA
# a25W3NJIaL4+2y7oX2gaOTfBdWdbL56eZ1QgRqQGwfYoL+L9cS9nj3v6LrQGaJpW
# tYQCinO5mYcdDncWIUJkaZ7IblVnytF1d8oSvEFUhJr9u2RG+iLL4rhKtpUQ+r1M
# W0HmOPpNEM9zugpyjWN57Ojf/lXs+zLORN6djopWGzR3/oxr3FhytAGn0UikfS08
# 9RLYhfrzmyHAzY+pNym8ZHOWxIA60KidOMYFwTy9ZesxMC8U0mQL8eC449FskjY0
# V6QkvY/UATwJNtVdIbDHlZtquZrwEH7e7dtAeyC2DRIooFcdHMYZqqvb3guqceq1
# +Hz25BOebMZW+5c85EUSF1rLQCMs/NvdiKTBhUrfLuQiNkXlf2dOi1jadBJh/EsB
# sYCejM/diqqrxIrd3SAzTCTLX6MNSQyFqgRrDvoMgsMmhaFriEZ0/9//4pyEU+46
# QlONhSBTw3HihAHvHPP+MPYgoJHExnz5teZ/NQEPYhs6u2lsQ1ueuTlWSHZaUQ/p
# LOjmyku7cwXhnCkEFro=
# SIG # End signature block
