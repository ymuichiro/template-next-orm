import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  message?: string;
  hasError?: boolean;
  children: ReactNode;
}

interface ErrorBoundaryStates {
  hasError?: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryStates> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: props.hasError ? props.hasError : false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryStates {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card variant='error' style={{ width: '100%' }}>
          <CardContent>
            <Typography variant='h5' color='textSecondary' align='left' gutterBottom>
              Error
            </Typography>
            {this.props.message ? (
              <Typography variant='body1' color='textSecondary' align='left'>
                {this.props.message}
              </Typography>
            ) : null}
            <div style={{ display: 'flex', justifyContent: 'right' }}>
              <Button color='error' onClick={() => this.setState({ hasError: false })}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
