'use client'

export default function PasswordToClipboard() {
    return (
        <p>Click <button type='button' onClick={() => navigator.clipboard.writeText('openseattle')}>here</button> to copy passcode to clipboard</p>
    )
}
