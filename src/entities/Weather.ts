import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Precipitation, Summary } from './enums/WeatherEnums';

@Entity('weather')
@Unique(['city', 'date'])
export class Weather extends BaseEntity {
  @Column()
  city: string;

  @Column('timestamp')
  date: string;

  @Column({ type: 'enum', enum: Summary })
  summary: Summary;

  @Column({ type: 'enum', enum: Precipitation, nullable: true })
  precipitation: Precipitation | null;

  @Column('int')
  temperature: number;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  humidity: number;

  @Column('int')
  windSpeed: number;

  @Column('int')
  windBearing: number;
}
