type SoundKey = 'button' | 'alert' | 'catch' | 'score' | 'music';

export class AudioSystem {
  private readonly sounds = new Map<SoundKey, Phaser.Sound.BaseSound>();

  constructor(private readonly scene: Phaser.Scene) {}

  create(): void {
    this.generateTone('button', 660, 0.07, 'square', 0.12);
    this.generateTone('alert', 220, 0.18, 'sawtooth', 0.18);
    this.generateTone('catch', 880, 0.13, 'square', 0.16);
    this.generateTone('score', 1046, 0.1, 'triangle', 0.14);
    this.generateLoop();
  }

  play(key: SoundKey): void {
    this.sounds.get(key)?.play();
  }

  playMusic(): void {
    const music = this.sounds.get('music');
    if (music && !music.isPlaying) {
      music.play({ loop: true, volume: 0.14 });
    }
  }

  stopMusic(): void {
    this.sounds.get('music')?.stop();
  }

  private generateTone(key: SoundKey, frequency: number, seconds: number, type: OscillatorType, volume: number): void {
    const audioContext = new AudioContext();
    const sampleRate = audioContext.sampleRate;
    const length = Math.floor(sampleRate * seconds);
    const buffer = audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i += 1) {
      const t = i / sampleRate;
      const phase = frequency * t;
      const wave =
        type === 'square'
          ? Math.sign(Math.sin(phase * Math.PI * 2))
          : type === 'sawtooth'
            ? 2 * (phase - Math.floor(phase + 0.5))
            : Math.sin(phase * Math.PI * 2);
      data[i] = wave * volume * (1 - i / length);
    }

    audioContext.close();
    this.scene.cache.audio.add(key, buffer);
    this.sounds.set(key, this.scene.sound.add(key));
  }

  private generateLoop(): void {
    const audioContext = new AudioContext();
    const sampleRate = audioContext.sampleRate;
    const seconds = 2.4;
    const length = Math.floor(sampleRate * seconds);
    const buffer = audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    const notes = [262, 330, 392, 523, 392, 330, 294, 392];

    for (let i = 0; i < length; i += 1) {
      const t = i / sampleRate;
      const note = notes[Math.floor((t / seconds) * notes.length) % notes.length];
      data[i] = Math.sign(Math.sin(note * t * Math.PI * 2)) * 0.055;
    }

    audioContext.close();
    this.scene.cache.audio.add('music', buffer);
    this.sounds.set('music', this.scene.sound.add('music'));
  }
}
